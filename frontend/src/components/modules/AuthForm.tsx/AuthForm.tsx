import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const signinSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(20, { message: "Password must be at most 20 characters" }),
});

type SignInInputs = z.infer<typeof signinSchema>;

export default function AuthForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isValid, isDirty },
  } = useForm<SignInInputs>({
    resolver: zodResolver(signinSchema),
    mode: "onTouched",
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (data: SignInInputs) => {
    console.log("Submitted:", data);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <h1>HELLO SIGNUP</h1>
      <form>
        <input {...register("email")} type="email" placeholder="Email" />
        <input
          {...register("password")}
          type="password"
          placeholder="Password"
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
