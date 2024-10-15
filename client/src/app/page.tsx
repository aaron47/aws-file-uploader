'use client';
import { useGetUserFilesQuery } from '@/generated/graphql';
import DragAndDrop from './_components/DragAndDrop';
import Image from 'next/image';

export default function Home() {
  const { data, loading, error, refetch } = useGetUserFilesQuery();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <DragAndDrop refetch={refetch} />

      {loading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}

      <div className="grid grid-cols-3 gap-4">
        {data?.getUserFiles.map((file, index) => {
          const { base64, contentType, fileName } = file;

          if (contentType.startsWith('image/')) {
            // Render image files
            return (
              <Image
                key={index}
                src={`data:${contentType};base64,${base64}`} // Base64 image data URI
                alt={fileName}
                className="w-full h-auto"
                width={200}
                height={200}
              />
            );
          } else if (contentType === 'application/pdf') {
            // Render PDF files as a downloadable link
            return (
              <a
                key={index}
                href={`data:${contentType};base64,${base64}`}
                download={fileName}
                className="pdf-link">
                Download {fileName} (PDF)
              </a>
            );
          } else if (contentType.startsWith('video/')) {
            // Render video files
            return (
              <video key={index} controls className="w-full h-auto">
                <source
                  src={`data:${contentType};base64,${base64}`}
                  type={contentType}
                />
                Your browser does not support the video tag.
              </video>
            );
          } else {
            // For other file types, render a download link
            return (
              <a
                key={index}
                href={`data:${contentType};base64,${base64}`}
                download={fileName}
                className="file-link">
                Download {fileName}
              </a>
            );
          }
        })}
      </div>
    </div>
  );
}
