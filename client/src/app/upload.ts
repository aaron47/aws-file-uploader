'use server';
import { cookies } from 'next/headers';
import { API_URL } from './util/constants';

const getHeaders = () => ({
  Cookie: cookies().toString(),
});

export default async function uploadFile(formData: FormData) {
  const res = await fetch(`${API_URL}/upload`, {
    method: 'POST',
    headers: { ...getHeaders() },
    body: formData,
  });

  if (!res.ok) {
    throw new Error("There was an error uploading the file, please try again.");
  }

  return { success: true, message: 'File uploaded successfully' };
}
