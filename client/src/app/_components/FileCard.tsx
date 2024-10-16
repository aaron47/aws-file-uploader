import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, File as FileIcon, FileImage, FileVideo } from 'lucide-react';

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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">{file.fileName}</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col items-center justify-center">
        {/* Render the appropriate file icon */}
        <div className="icon-container mb-4">{renderIcon(contentType)}</div>

        {/* Download Button */}
        <a
          href={`data:${contentType};base64,${base64}`}
          download={fileName}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition">
          <Download className="mr-2" size={20} />
          Download
        </a>
      </CardContent>
    </Card>
  );
}
