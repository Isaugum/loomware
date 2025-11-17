import { Endpoints } from '@/core/enums/Endpoints.enum';
import { useRequestMutation } from '../useMutation';
import { SignInTypes } from '@/core/types/auth/sign-in.type';

export default function useSignIn() {
  const { mutateAsync, data, isLoading, isSuccess, isError } = useRequestMutation();

  const signIn = async (formData: SignInTypes) => {
    try {
      const result = await mutateAsync({
        url: Endpoints.SIGN_IN,
        method: 'POST',
        data: formData,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Signed in!', result);
    } catch (err) {
      console.error('Signin failed:', err);
    }
  };

  return {
    signIn,
    data,
    isLoading,
    isSuccess,
    isError,
  };
}
