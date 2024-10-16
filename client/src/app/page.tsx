'use client';
import { useGetUserFilesQuery } from '@/generated/graphql';
import DragAndDrop from './_components/DragAndDrop';
import FileCard from './_components/FileCard';
import { Skeleton } from '@/components/ui/skeleton';

export default function Home() {
  const { data, loading, error, refetch } = useGetUserFilesQuery();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <DragAndDrop refetch={refetch} />

      {loading && (
        <div className="flex gap-2">
          <Skeleton className="h-10 w-10 bg-gray-300 rounded-full mx-auto mb-4" />
          <Skeleton className="h-10 w-10 bg-gray-300 rounded-full mx-auto mb-4" />
          <Skeleton className="h-10 w-10 bg-gray-300 rounded-full mx-auto mb-4" />
        </div>
      )}
      {error && <div>Error: {error.message}</div>}
      {data?.getUserFiles.length === 0 && <div>You currently do not have any files uploaded, go upload some!</div>}

      <div className="grid grid-cols-4 gap-4">
        {data?.getUserFiles.map((file, index) => (
          <div key={index}>
            <FileCard file={file} />
          </div>
        ))}
      </div>
    </div>
  );
}
