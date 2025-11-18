import { Endpoints } from '@/core/enums/Endpoints.enum';
import { useRequestMutation } from '../useMutation';
import { redirect } from 'next/navigation';
import { RouteTypes } from '@/core/enums/RouteTypes.enum';
import { useUserStore } from '@/state/user.state';

export default function useSignOut() {
  const { mutateAsync, isError } = useRequestMutation();
  const { clearUser } = useUserStore();

  const signOut = async () => {
    await mutateAsync(
      {
        url: Endpoints.SIGN_OUT,
        method: 'POST',
      },
      {
        onSuccess: () => {
          clearUser();
          redirect(RouteTypes.DASHBOARD);
        },
        onError: (err: Error) => {
          console.error(err);
        },
      },
    );
  };

  return {
    signOut,
    isError,
  };
}
