'use client';

import Link from "next/link";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Input from "@/components/atoms/Input/Input";
import { signupSchema, SignUpTypes } from "@/core/types/auth/sign-up.type";
import useSignUp from "@/hooks/api/useSignUp";

export default function SignupForm() {
    const { signUp } = useSignUp();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpTypes>({
        resolver: zodResolver(signupSchema),
        mode: "onTouched",
        defaultValues: { email: "", password: "" },
    })
        
    const onSubmit = async (formData: SignUpTypes) => {
        await signUp(formData);
    }

    return (
        <div className="flex flex-col items-center justify-center gap-4 max-w-[300px] w-full">
            <h2 className="text-2xl font-bold">Sign up</h2>
            <Input type="email" placeholder="Email" register={register('email')} error={errors.email} />
            <Input type="password" placeholder="Password" register={register('password')} error={errors.password} />
            <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-md" onClick={handleSubmit(onSubmit)}>Sign up</button>
            <p className="text-sm text-gray-500">Already a user? <Link href="/sign-up" className="text-blue-500">Sign in</Link></p>
        </div>
    )
}
