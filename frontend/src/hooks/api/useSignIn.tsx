import { Endpoints } from '@/core/enums/Endpoints.enum';
import { useRequestMutation } from '../useMutation';
import { SignInTypes } from '@/core/types/auth/sign-in.type';
import { redirect } from 'next/navigation';
import { RouteTypes } from '@/core/enums/RouteTypes.enum';
import { useUserStore } from '@/state/user.state';

export default function useSignIn() {
  const { mutateAsync, data, isLoading, isSuccess, isError } = useRequestMutation();
  const { setUser } = useUserStore();

  const signIn = async (formData: SignInTypes) => {
    await mutateAsync(
      {
        url: Endpoints.SIGN_IN,
        method: 'POST',
        data: formData,
        headers: {
          'Content-Type': 'application/json',
        },
      },
      {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onSuccess: (response: any) => {
          setUser(response.user);
          redirect(RouteTypes.DASHBOARD);
        },
        onError: (err: Error) => {
          console.error(err);
        },
      },
    );
  };

  return {
    signIn,
    data,
    isLoading,
    isSuccess,
    isError,
  };
}
