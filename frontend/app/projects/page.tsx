import { RouteTypes } from '@/core/enums/RouteTypes.enum';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function ProjectsPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get('usersession')?.value;

  if (!session) {
    redirect(RouteTypes.SIGN_IN);
  }

  return <section></section>;
}
