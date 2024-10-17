'use client';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import uploadFile from '../upload';
import { Exact, GetUserFilesQuery } from '@/generated/graphql';
import { ApolloQueryResult } from '@apollo/client';
import { UploadCloud } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

interface Props {
  refetch: (
    variables?:
      | Partial<
          Exact<{
            [key: string]: never;
          }>
        >
      | undefined
  ) => Promise<ApolloQueryResult<GetUserFilesQuery>>;
}

export default function MyDropzone({ refetch }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const onDrop = useCallback(
    async (acceptedFiles: (string | Blob)[]) => {
      const formData = new FormData();
      formData.append('file', acceptedFiles[0]);
      try {
        setIsLoading(true);
        // Await the upload to finish before refetching
        const { success } = await uploadFile(formData);

        if (success) {
          toast({
            title: 'File uploaded successfully',
            description: 'Your file has been uploaded successfully.',
            color: 'green',
            duration: 3000,
          });
          // Call refetch to get updated list of files after upload

          await refetch();
        } else {
          toast({
            title: 'Error uploading file',
            description: 'There was an error uploading your file.',
            color: 'red',
            duration: 3000,
          });
        }
      } catch (err) {
        console.error('Error uploading file:', err);
        toast({
          title: 'Error!',
          description: 'Error uploading file. Please try again.',
          color: 'red',
          duration: 3000,
        });
      } finally {
        setIsLoading(false);
      }
    },
    [refetch, toast]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className={`md:p-6 p-2 border-2 border-dashed rounded-lg cursor-pointer transition-all duration-300 ease-in-out text-center mb-6 ${
        isDragActive
          ? 'border-blue-500 bg-blue-100'
          : 'border-gray-300 hover:border-blue-500'
      }`}>
      <input {...getInputProps()} className="hidden" />
      {isLoading ? (
        <Skeleton className="h-10 w-10 bg-gray-300 rounded-full mx-auto mb-4" />
      ) : (
        <>
          <UploadCloud className="mx-auto mb-2" size={48} />
          {isDragActive ? (
            <p className="text-blue-600 font-medium">Drop the files here ...</p>
          ) : (
            <p className="text-gray-600 font-medium">
              Drag &apos;n&apos; drop some files here, or click to select files
            </p>
          )}
        </>
      )}
    </div>
  );
}
