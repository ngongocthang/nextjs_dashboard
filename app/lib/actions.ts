'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import bcrypt from 'bcrypt';

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[-_!@#$%^&*]).{8,}$/;

// A Zod schema for the name field
const nameSchema = z.string().min(3, "Name must have at least 3 characters");

// A Zod schema for the email field
const emailSchema = z.string().regex(emailRegex, "Invalid email format");

// A Zod schema for the image field
// const image_urlSchema = z.string().url('Invalid image URL');
const image_urlSchema = z.string().optional();

// A Zod schema for the password field
const passwordSchema = z.string().regex(passwordRegex, `
  Password must have at least 8 characters, 
  one special character, one upper case letter and one lower case letter
`);

// A Zod schema for the object with name, email and password fields
const UserSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
});


const InvoicesSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Please select a customer.',
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than $0.' }),
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Please select an invoice status.',
  }),
  date: z.string(),
});

// add customer
const CustomerSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  image_url: image_urlSchema,
});
//

// Use Zod to update the expected types (loai bo hai trg)
const CreateInvoice = InvoicesSchema.omit({ id: true, date: true });
const UpdateInvoice = InvoicesSchema.omit({ id: true, date: true });

// This is temporary until @types/react-dom is updated



export type InvoiceState = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

export type UserState = {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
    theme?: string[];
  }
  message?: string | null;
}

export type CustomerState = {
  errors?: {
    name?: string[];
    email?: string[];
  }
  message?: string | null;
}



export async function createInvoice(prevState: InvoiceState, formData: FormData) {
  // Validate form using Zod
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
 
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }
 
  // Prepare data for insertion into the database
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];
 
  // Insert data into the database
  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }
 
  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function updateInvoice(
  id: string,
  prevState: InvoiceState,
  formData: FormData,
) {
  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
 
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Invoice.',
    };
  }
 
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
 
  try {
    await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Invoice.' };
  }
 
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath('/dashboard/invoices');
    return { message: 'Deleted Invoice.' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Invoice.' };
  }
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

// add Customer
export async function createCustomer(prevState: CustomerState, formData: FormData) {
  // Validate form using Zod
  const validatedFields = CustomerSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    image_url: formData.get('image_url'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Customer.',
    };
  }

  // Prepare data for insertion into the database
  const { name, email, image_url } = validatedFields.data;

  // Insert data into the database
  try {
    // Check if a customer with the same email already exists
    const existingCustomer = await sql<{ id: string }>`
      SELECT id FROM customers WHERE email = ${email}
    `;

    if (existingCustomer.rowCount > 0) {
      return {
        errors: { email: ['A customer with this email already exists.'] },
        message: 'Failed to create customer. Email is already registered.',
      };
    }

    await sql`
      INSERT INTO customer (name, email, image_url)
      VALUES (${name}, ${email}, ${image_url})
    `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Customer. Please try again later.'+ error,
    };
  }

  // Revalidate the cache for the customers page and redirect the user.
  revalidatePath('/dashboard/customers');
  redirect('/dashboard/customers');
}

//
