import Dashboard from '@/components/pages/Dashboard/Dashboard';
import { RouteTypes } from '@/core/enums/RouteTypes.enum';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function IndexPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get('usersession')?.value;

  if (!session) {
    redirect(RouteTypes.SIGN_IN);
  }

  return <Dashboard />;
}
