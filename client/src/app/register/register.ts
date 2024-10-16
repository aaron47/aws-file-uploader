'use server';
import { redirect } from 'next/navigation';
import { API_URL } from '../util/constants';

export default async function register(formData: FormData) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(Object.fromEntries(formData)),
  });
  // const parsedRes = await res.json();
  if (!res.ok) {
    return { error: 'an error has occurred' };
  }
  redirect('/login');
}