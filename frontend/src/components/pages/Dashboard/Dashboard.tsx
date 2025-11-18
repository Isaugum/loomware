'use client';

import { useUserStore } from '@/state/user.state';

export default function Dashboard() {
  const { user } = useUserStore();

  console.log(user);

  return (
    <section>
      <h1>WELCOME, {user?.username.toUpperCase()}</h1>
    </section>
  );
}
