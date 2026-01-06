import { useState, useRef, useEffect, useCallback } from "react";
import * as LR from "@uploadcare/blocks";
import { type OutputFileEntry } from "@uploadcare/blocks";
import blocksStyles from "@uploadcare/blocks/web/lr-file-uploader-regular.min.css?url";
import { type FileEntry } from "@/types/type";

LR.registerBlocks(LR);

interface IFileUploaderProps {
  fileEntry: FileEntry;
  onChange: (fileEntry: FileEntry) => void;
}

const FileUploader: React.FunctionComponent<IFileUploaderProps> = ({
  fileEntry,
  onChange,
}) => {
  // We don't need local state 'uploadedFiles' to drive the logic, 
  // we can handle it directly in the event to prevent re-render loops.
  
  const ctxProviderRef = useRef<
    typeof LR.UploadCtxProvider.prototype & LR.UploadCtxProvider
  >(null);

  const handleRemoveClick = useCallback(
    (uuid: OutputFileEntry["uuid"]) =>
      onChange({ files: fileEntry.files.filter((f) => f.uuid !== uuid) }),
    [fileEntry.files, onChange]
  );

  useEffect(() => {
    const ctxProvider = ctxProviderRef.current;
    if (!ctxProvider) return;

    // 1. Handle the event when files are successfully uploaded
    const handleUploadEvent = (e: CustomEvent<OutputFileEntry[]>) => {
      if (e.detail) {
        console.log("Files uploaded:", e.detail);
        // We don't set local state here to avoid re-triggering this effect
      }
    };

    // 2. Handle when the user clicks "Done"
    const handleDoneFlow = () => {
      // Get the current list of files from the provider directly
      const newFiles = ctxProvider.uploadCollection.items();

      // Send to parent (Combine existing files + new files)
      // Note: We filter duplicates just in case
      const currentUuids = new Set(fileEntry.files.map(f => f.uuid));
      const uniqueNewFiles = newFiles.filter(f => !currentUuids.has(f.uuid));

      onChange({ files: [...fileEntry.files, ...uniqueNewFiles] });

      // Clear the uploader UI
      ctxProvider.uploadCollection.clearAll();
    };

    ctxProvider.addEventListener("data-output", handleUploadEvent);
    ctxProvider.addEventListener("done-flow", handleDoneFlow);

    return () => {
      ctxProvider.removeEventListener("data-output", handleUploadEvent);
      ctxProvider.removeEventListener("done-flow", handleDoneFlow);
    };
  }, [fileEntry.files, onChange]); // Dependencies cleaned up

  return (
    <div>
      <lr-config
        ctx-name="my-uploader"
        pubkey="a8036ed35ef393a55b86" 
        multiple={true}
        confirmUpload={false}
        removeCopyright={true}
        imgOnly={true}
      ></lr-config>

      <lr-file-uploader-regular
        ctx-name="my-uploader"
        css-src={blocksStyles}
      ></lr-file-uploader-regular>

      <lr-upload-ctx-provider ctx-name="my-uploader" ref={ctxProviderRef} />

      <div className="grid grid-cols-2 gap-4 mt-8">
        {fileEntry.files.map((file) => (
          <div key={file.uuid} className="relative">
            <img
              key={file.uuid}
              src={`${file.cdnUrl}/-/format/webp/-/quality/smart/-/stretch/fill/`}
              className="w-full h-full object-cover rounded-md"
            />

            <div className="cursor-pointer flex justify-center absolute -right-2 -top-2 bg-white border-2 border-slate-800 rounded-full w-7 h-7">
              <button
                className="text-slate-800 text-center font-bold"
                type="button"
                onClick={() => handleRemoveClick(file.uuid)}
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUploader;