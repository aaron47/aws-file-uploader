'use server';

import { getMe } from './get-me';

export default async function ServerAuthCheck({
  children,
}: {
  children: React.ReactNode;
}) {
  const me = await getMe();

  if (!me.email) {
    return null;
  }

  return <>{children}</>;
}
