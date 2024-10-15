'use client';
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import uploadFile from '../upload';
import { Exact, GetUserFilesQuery } from '@/generated/graphql';
import { ApolloQueryResult } from '@apollo/client';

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
  const onDrop = useCallback(
    async (acceptedFiles: (string | Blob)[]) => {
      const formData = new FormData();
      formData.append('file', acceptedFiles[0]);
      try {
        // Await the upload to finish before refetching
        await uploadFile(formData);

        // Call refetch to get updated list of files after upload
        await refetch();
      } catch (err) {
        console.error('Error uploading file:', err);
      }
    },
    [refetch]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag &apos;n&apos; drop some files here, or click to select files</p>
      )}
    </div>
  );
}
