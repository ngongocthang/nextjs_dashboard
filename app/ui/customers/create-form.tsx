'use client';

// import { CustomerField } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  AtSymbolIcon,
  UserCircleIcon,
  PhotoIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createCustomer } from '@/app/lib/actions';
import { useFormState } from 'react-dom';

export default function Form() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createCustomer, initialState);

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium text-black">
            Name:
          </label>
          <div className="relative">
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Type the customer name"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 text-black"
              aria-describedby="name-error"
            />
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="name-error" aria-live="polite" aria-atomic="true">
            {state.errors?.name &&
              state.errors.name.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Invoice Amount */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium text-black">
            Email
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="email"
                name="email"
                type="mail"
                placeholder="Enter the customer email"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 text-black"
                aria-describedby="email-error"
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="amount-error" aria-live="polite" aria-atomic="true">
              {state.errors?.email &&
                state.errors.email.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>
 

        {/* Image URL */}
        <div className="mb-4">
          <label htmlFor="image_url" className="mb-2 block text-sm font-medium text-black">
            Image URL
          </label>
          <div className="relative">
            <input
              id="image_url"
              name="image_url"
              type="text"
              placeholder="Enter the image URL"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 text-black"
              aria-describedby="image_url-error"
            />
            <PhotoIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500s" />
          </div>
          <div id="image_url-error" aria-live="polite" aria-atomic="true">
            {state.errors?.image_url &&
              state.errors.image_url.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {state.message && (
          <p className="mt-2 text-sm text-red-500" key={state.message}>
            {state.message}
          </p>
        )}
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/customers"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Customer</Button>
      </div>
    </form>
  );
}
