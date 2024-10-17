'use server';

import { cookies } from 'next/headers';
import { AUTHENTICATION_COOKIE_NAME } from '../constants';
import { isTokenExpired } from '../is-token-expired';

export default async function ServerAuthCheck({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = cookies().get(AUTHENTICATION_COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  const expired = isTokenExpired(token);

  if (expired) {
    return null;
  }

  return <>{children}</>;
}
