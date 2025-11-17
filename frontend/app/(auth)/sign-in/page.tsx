import SigninForm from '@/components/modules/SigninForm/SigninForm';
import { RouteTypes } from '@/core/enums/RouteTypes.enum';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Page() {
  const cookieStore = await cookies();
  const session = cookieStore.get('usersession')?.value;

  if (session) {
    redirect(RouteTypes.DASHBOARD);
  }

  return (
    <section className="flex flex-col items-center justify-center h-screen">
      <SigninForm />
    </section>
  );
}
