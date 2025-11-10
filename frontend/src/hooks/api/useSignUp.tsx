import { Endpoints } from "@/core/enums/Endpoints.enum";
import { useRequestMutation } from "../useMutation";
import { SignUpTypes } from "@/core/types/auth/sign-up.type";



export default function useSignUp() {
    const { mutateAsync, data, isLoading, isSuccess, isError } = useRequestMutation();

    const signUp = async (formData: SignUpTypes) => {
        try {
            const result = await mutateAsync({
              url: Endpoints.SIGN_UP,
              method: "POST",
              data: formData,
              headers: { 
                "Content-Type": "application/json" 
              },
            });
            console.log("Signed up!", result);
        } catch (err) {
            console.error("Signup failed:", err);
        }
    }

    return {
        signUp,
        data,
        isLoading,
        isSuccess,
        isError
    };
}