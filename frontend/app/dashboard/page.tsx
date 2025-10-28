import { Endpoints } from '@/core/enums/endpoints.enum';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function IndexPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get('session')?.value;

  if (session) {
    redirect(Endpoints.DASHBOARD);
  }

  redirect(Endpoints.SIGN_IN);
}