import { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import { cn, convertFileToUrl } from "../../lib/utils";

type FileUploaderAreaProps = {
  onChange: (files: File[]) => void;
  imageUrl: string;
  type: "image" | "avatar";
};

export default function FileUploaderArea({
  onChange,
  imageUrl,
  type,
}: FileUploaderAreaProps) {
  const [fileUrl, setFileUrl] = useState<string>(imageUrl);

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      onChange(acceptedFiles);
      setFileUrl(convertFileToUrl(acceptedFiles[0]));
    },
    [onChange]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".svg", ".jpeg", ".jpg"],
    },
  });

  return (
    <div
      {...getRootProps()}
      className="flex justify-center items-center flex-col rounded-xl bg-dark-4 cursor-pointer"
    >
      <input {...getInputProps()} className="cursor-pointer" />
      {fileUrl ? (
        <>
          <div
            className={cn(
              "p-6 pb-2",
              type === "avatar" && "w-48 aspect-square"
            )}
          >
            <img
              src={fileUrl}
              alt="Uploaded file"
              className={cn(
                "max-h-96 w-full object-cover rounded-xl overflow-hidden",
                type === "avatar" && "rounded-full"
              )}
            />
          </div>
          <p className="text-sm text-light-4 mb-2">
            Click or drag photo to replace
          </p>
        </>
      ) : (
        <>
          <img
            src="/file-upload.svg"
            alt="File upload icon"
            className="mb-1 mt-6"
          />
          <h3 className="text-light-2 mb-1">Click or drag photo</h3>
          <p className="text-xs text-light-4 mb-5">SVG, PNG, JPG</p>
        </>
      )}
    </div>
  );
}
