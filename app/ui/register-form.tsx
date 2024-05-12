'use client';

import { lusitana } from '@/app/ui/fonts';
import {
  UserIcon,
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/20/solid';
import { Button } from '@/app/ui/button';
import { useFormState } from 'react-dom';
import { createUserWithCredentials } from '@/app/lib/actions';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createUserWithCredentials, initialState);

  return (
    <div
    className="flex-1 rounded-lg bg-white px-6 pb-4 pt-8 text-black dark:text-white border border-gray-300"
    // className="flex-1 rounded-lg bg-white dark:bg-[#212121] px-6 pb-4 pt-8 text-black dark:text-white"
  >
    <h1 className={`${lusitana.className} mb-3 text-2xl  text-black`}>
      Fill in the blanks to create a new account
    </h1>
    <form action={dispatch} className="space-y-3">
      <div className="w-full">
        {/* <div>
          <label
            className={`mb-3 mt-5 block text-xs font-medium  text-black`}
            htmlFor="name"
          >
            Name:
          </label>
          <div className="relative">
            <input
              className={`peer block w-full rounded-md border border-gray-200 
              py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 
              bg-white text-gray-900`}
              id="name"
              type="name"
              name="name"
              placeholder="Enter your name"
              required
            />
            <UserIcon
              className={`pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 dark:text-gray-300 peer-focus:text-gray-900`}
            />
          </div>
          <div id="name-error" aria-live="polite" aria-atomic="true">
            {state.errors?.name &&
              state.errors.name.map((error: string) => (
                <p className="mt-2 text-sm text-red-500 dark:text-red-400" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div> */}
        {/*  */}
         <div>
          <label
            className={`mb-3 mt-5 block text-xs font-medium  text-black`}
            htmlFor="email"
          >
            Name:
          </label>
          <div className="relative">
            <input
              className={`peer block w-full rounded-md border border-gray-200 
                  py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 
                  bg-white text-gray-900`}
              id="name"
              type="text"
              name="name"
              placeholder="Enter your name "
              required
            />
            <UserIcon
              className={`pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 dark:text-gray-300 peer-focus:text-gray-900`}
            />
          </div>
          <div id="email-error" aria-live="polite" aria-atomic="true">
            {state.errors?.name &&
              state.errors.name.map((error: string) => (
                <p className="mt-2 text-sm text-red-500 dark:text-red-400" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        {/*  */}
        <div>
          <label
            className={`mb-3 mt-5 block text-xs font-medium  text-black`}
            htmlFor="email"
          >
            Email:
          </label>
          <div className="relative">
            <input
              className={`peer block w-full rounded-md border border-gray-200 
                  py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 
                  bg-white text-gray-900`}
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email address"
              required
            />
            <AtSymbolIcon
              className={`pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 dark:text-gray-300 peer-focus:text-gray-900`}
            />
          </div>
          <div id="email-error" aria-live="polite" aria-atomic="true">
            {state.errors?.email &&
              state.errors.email.map((error: string) => (
                <p className="mt-2 text-sm text-red-500 dark:text-red-400" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className="mt-4">
          <label
            className={`mb-3 mt-5 block text-xs font-medium  text-black`}
            htmlFor="password"
          >
            Password:
          </label>
          <div className="relative">
            <input
              className={`peer block w-full rounded-md border border-gray-200 
                  py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 
                  bg-white text-gray-900`}
              id="password"
              type="password"
              name="password"
              placeholder="Enter password"
              required
              minLength={6}
            />
            <KeyIcon
              className={`pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 dark:text-gray-300 peer-focus:text-gray-900`}
            />
          </div>
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.password &&
              state.errors.password.map((error: string) => (
                <p className="mt-2 text-sm text-red-500 dark:text-red-400" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
      </div>
  
      {state.message && (
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          <ExclamationCircleIcon className="h-10 w-5 text-red-500 dark:text-red-400" />
          <p className="text-sm text-red-500 dark:text-red-400">{state.message}</p>
        </div>
      )}
  
      <CreateAccountButton />
    </form>
  
    <ReturnToLoginPageButton />
  </div>
  
  );
}

function CreateAccountButton() {
  return (
    // <Button className="mt-4 w-full hover:bg-gray-800 text-white dark:bg-gray-300 dark:text-gray-900 dark:hover:bg-gray-400">
    //   Create Account <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50 dark:text-gray-900" />
    // </Button>
    <Button className="mt-4 w-full" >
    Create Account <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
  </Button>
  );
}

function ReturnToLoginPageButton() {
  const { replace } = useRouter();

  return (
    // <Button className="mt-4 w-full bg-gray-900 hover:bg-gray-800 text-white dark:bg-gray-300 dark:text-gray-900 dark:hover:bg-gray-400" onClick={() => {
    //   replace('/login');
    // }}>
    //   Go back to the Login page <ArrowLeftIcon className="ml-auto h-5 w-5 text-gray-50 dark:text-gray-900" />
    // </Button>
    <Button className="mt-4 w-full" onClick={() => {  replace('/login');}}>
     Go back to the Login page <ArrowLeftIcon className="ml-auto h-5 w-5 text-gray-50" />
  </Button>
  );
}
