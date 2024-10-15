'use server';
import { cookies } from 'next/headers';
import { API_URL } from './util/constants';

const getHeaders = () => ({
  Cookie: cookies().toString(),
});

export default async function uploadFile(formData: FormData) {
  await fetch(`${API_URL}/upload`, {
    method: 'POST',
    headers: { ...getHeaders() },
    body: formData,
  });
}
