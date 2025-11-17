'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '@/components/atoms/Input/Input';
import useSignIn from '@/hooks/api/useSignIn';

const signinSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Invalid email address' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

type SignInTypes = z.infer<typeof signinSchema>;

export default function SigninForm() {
  const { signIn } = useSignIn();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInTypes>({
    resolver: zodResolver(signinSchema),
    mode: 'onTouched',
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (formData: SignInTypes) => {
    signIn(formData);
  };

  return (
    <form className="flex flex-col items-center justify-center gap-4 max-w-[300px] w-full">
      <h2 className="text-2xl font-bold">Sign in</h2>
      <Input type="email" placeholder="Email" register={register('email')} error={errors.email} />
      <Input
        type="password"
        placeholder="Password"
        register={register('password')}
        error={errors.password}
      />
      <button
        type="submit"
        className="w-full p-2 bg-blue-500 text-white rounded-md"
        onClick={handleSubmit(onSubmit)}
      >
        Sign in
      </button>
      <p className="text-sm text-gray-500">
        Dont have an account?
        <Link href="/sign-up" className="text-blue-500">
          Sign up
        </Link>
      </p>
    </form>
  );
}
