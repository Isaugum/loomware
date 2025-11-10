import { ReouteTypes } from '@/core/enums/RouteTypes.enum';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function IndexPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get('session')?.value;

  if (session) {
    redirect(ReouteTypes.DASHBOARD);
  }

  redirect(ReouteTypes.SIGN_IN);
}