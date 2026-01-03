import { FileUploaderMinimal } from '@uploadcare/react-uploader';
import '@uploadcare/react-uploader/core.css';

function FileUploader() {
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
    </div>
  );
}

export default FileUploader;