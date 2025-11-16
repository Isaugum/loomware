'use client';

import Error from '@/components/atoms/Error/Error';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

interface InputProps {
  type?: 'text' | 'email' | 'password';
  placeholder?: string;
  register?: UseFormRegisterReturn;
  error?: FieldError;
}

export default function Input({
  type = 'text',
  placeholder = 'Placeholder',
  register,
  error,
}: InputProps) {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full p-2 border border-gray-300 rounded-md"
        {...register}
      />
      <Error error={error} />
    </>
  );
}
