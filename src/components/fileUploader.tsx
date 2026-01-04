import type { fileEntry } from '@/types';
import { FileUploaderMinimal, type OutputFileEntry } from '@uploadcare/react-uploader';
import '@uploadcare/react-uploader/core.css';
import { useState, useRef } from 'react';
import * as LR from '@uploadcare/react-uploader';

type FileUploaderProps = {
  fileEntry: fileEntry,
  onChange: (fileEntry: fileEntry) => void
}

const FileUploader: React.FunctionComponent<FileUploaderProps> = ({ fileEntry, onChange }) => {
  const [uploadedFiles, setUploadedFiles] = useState<OutputFileEntry[]>([])
  const ctxProviderRef = useRef<typeof LR.UploadCtxProvider.prototype & LR.UploadCtxProvider>(null);
  return (
    <div>
      <FileUploaderMinimal
        useCloudImageEditor={false}
        sourceList="local, camera, facebook, gdrive"
        filesViewMode="grid"
        gridShowFileNames={true}
        classNameUploader="uc-light"
        pubkey="a8036ed35ef393a55b86"
        onCommonUploadSuccess={(e) =>
          console.log(
            "Uploaded files URL list",
            e.detail.successEntries.map((entry) => entry.cdnUrl)
          )
        }
      />
      <lr-upload-ctx-provider ctx-name="my-uploader" ref={ctxProviderRef} />
    </div>
  );
}

export default FileUploader;
