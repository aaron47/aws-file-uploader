'use client';

import { Download } from 'lucide-react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

export default function FilePreview() {
  const searchParams = useSearchParams();

  const fileName = searchParams.get('fileName');
  const contentType = searchParams.get('contentType');
  const base64 = searchParams.get('base64');

  if (!fileName || !contentType || !base64) {
    return <div>Error: Missing file information</div>;
  }

	const decodedBase64 = decodeURIComponent(base64);

  function renderPreview() {
    const fileUrl = `data:${contentType};base64,${decodedBase64}`;

    if (!fileName || !contentType || !base64) {
      return <div>Error: Missing file information</div>;
    }

    if (contentType.startsWith('image/')) {
      return (
        <Image
          src={fileUrl}
          alt={fileName}
          width={400}
          height={400}
          className="h-auto max-h-96 m-4"
        />
      );
    } else if (contentType === 'application/pdf') {
      return (
        <iframe
          src={fileUrl}
          title={fileName}
          className="w-full h-96 border-none"
        />
      );
    } else if (contentType.startsWith('video/')) {
      return (
        <video controls className="w-full h-auto max-h-96">
          <source src={fileUrl} type={contentType} />
          Your browser does not support the video tag.
        </video>
      );
    } else {
      return <p>Preview not available for this file type.</p>;
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {renderPreview()}

      <a
        href={`data:${contentType};base64,${base64}`}
        download={fileName}
        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition">
        <Download className="mr-2" size={20} />
        Download
      </a>
    </div>
  );
}
