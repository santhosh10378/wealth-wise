import { UploadIcon } from 'lucide-react';
import { useCSVReader } from 'react-papaparse';
import { Button } from '../ui/button';

type Props = {
  onUpload: (results: any) => void;
};

export const UploadButton = ({ onUpload }: Props) => {
  const { CSVReader } = useCSVReader();

  return (
    <CSVReader>
      {({ getRootProps }: any) => (
        <Button onClick={onUpload} size='sm' className='w-full lg:w-auto bg-neutral-800 hover:bg-neutral-700' {...getRootProps()}>
          <UploadIcon className='size-4 mr-2' />
          Import
        </Button>
      )}
    </CSVReader>
  );
};
