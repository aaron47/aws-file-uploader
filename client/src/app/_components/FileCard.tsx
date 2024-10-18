import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Download,
  Eye,
  File as FileIcon,
  FileImage,
  FileVideo,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface File {
  __typename?: 'RetreiveFileResponseDto';
  contentType: string;
  fileName: string;
  base64: string;
}

interface Props {
  file: File;
}

export default function FileCard({ file }: Props) {
  const { base64, contentType, fileName } = file;
  const router = useRouter();

  function renderIcon(contentType: string) {
    if (contentType.startsWith('image/')) {
      return <FileImage size={64} />;
    } else if (contentType === 'application/pdf') {
      return <FileIcon size={64} />;
    } else if (contentType.startsWith('video/')) {
      return <FileVideo size={64} />;
    } else {
      return <FileIcon size={64} />;
    }
  }

  function previewFile() {
    const fileUrl = `data:${contentType};base64,${base64}`;

    if (contentType.startsWith('image/')) {
      sessionStorage.setItem('base64', base64);
      router.push(
        `/file-preview?fileName=${fileName}&contentType=${contentType})}`
      );
    } else {
      const newWindow = window.open();
      if (newWindow) {
        newWindow.document.write(
          `<iframe src="${fileUrl}" frameborder="0" style="border:none; top:0; left:0; bottom:0; right:0; width:100%; height:100%;" allowfullscreen></iframe>`
        );
        newWindow.document.title = fileName;
        newWindow.document.close();
      }
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">{file.fileName}</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col items-center justify-center">
        {/* Render the appropriate file icon */}
        <div className="icon-container mb-4">{renderIcon(contentType)}</div>

        <div className="flex gap-6 items-center justify-center">
          <Button
            onClick={previewFile}
            variant={'secondary'}
            className="inline-flex items-center px-4 py-2  text-white text-sm font-medium rounded  transition">
            <Eye className="mr-2" size={20} />
            Preview
          </Button>

          {/* Download Button */}
          <a
            href={`data:${contentType};base64,${base64}`}
            download={fileName}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition">
            <Download className="mr-2" size={20} />
            Download
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
