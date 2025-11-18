import { Endpoints } from '@/core/enums/Endpoints.enum';
import { useRequestMutation } from '../useMutation';
import { SignUpTypes } from '@/core/types/auth/sign-up.type';
import { redirect } from 'next/navigation';
import { RouteTypes } from '@/core/enums/RouteTypes.enum';
import { useUserStore } from '@/state/user.state';

export default function useSignUp() {
  const { mutateAsync, data, isLoading, isSuccess, isError } = useRequestMutation();
  const { setUser } = useUserStore();

  const signUp = async (formData: SignUpTypes) => {
    await mutateAsync(
      {
        url: Endpoints.SIGN_UP,
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
    signUp,
    data,
    isLoading,
    isSuccess,
    isError,
  };
}
