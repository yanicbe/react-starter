import { cn } from "@/lib/utils/cn";
import { FileText, Upload, X } from "lucide-react";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "./button";

interface FileUploadProps {
  value?: File | null;
  onChange: (file: File | null) => void;
  disabled?: boolean;
  className?: string;
  fileLabel?: string;
  existingFileUrl?: string;
  onRemoveExisting?: () => void;
  showRemoveButton?: boolean;
  acceptedFileTypes?: string[];
  maxSizeInMB?: number;
}

// Color mapping for different file extensions
const getFileExtensionColor = (extension: string): string => {
  const colors: Record<string, string> = {
    pdf: "bg-red-100 text-red-700 border-red-200",
    doc: "bg-blue-100 text-blue-700 border-blue-200",
    docx: "bg-blue-100 text-blue-700 border-blue-200",
    txt: "bg-gray-100 text-gray-700 border-gray-200",
    rtf: "bg-gray-100 text-gray-700 border-gray-200",
    xls: "bg-green-100 text-green-700 border-green-200",
    xlsx: "bg-green-100 text-green-700 border-green-200",
    ppt: "bg-orange-100 text-orange-700 border-orange-200",
    pptx: "bg-orange-100 text-orange-700 border-orange-200",
    zip: "bg-purple-100 text-purple-700 border-purple-200",
    rar: "bg-purple-100 text-purple-700 border-purple-200",
    jpg: "bg-pink-100 text-pink-700 border-pink-200",
    jpeg: "bg-pink-100 text-pink-700 border-pink-200",
    png: "bg-pink-100 text-pink-700 border-pink-200",
    gif: "bg-pink-100 text-pink-700 border-pink-200",
    mp4: "bg-indigo-100 text-indigo-700 border-indigo-200",
    avi: "bg-indigo-100 text-indigo-700 border-indigo-200",
    mp3: "bg-yellow-100 text-yellow-700 border-yellow-200",
    wav: "bg-yellow-100 text-yellow-700 border-yellow-200",
  };

  return colors[extension.toLowerCase()] || "bg-gray-100 text-gray-700 border-gray-200";
};

const getFileExtension = (filename: string): string => {
  return filename.split(".").pop()?.toUpperCase() || "FILE";
};

const getFileName = (url: string): string => {
  return url.split("/").pop() || "Datei";
};

export const FileUpload: React.FC<FileUploadProps> = ({
  value,
  onChange,
  disabled = false,
  className,
  fileLabel,
  existingFileUrl,
  onRemoveExisting,
  showRemoveButton = true,
  acceptedFileTypes = [
    ".pdf",
    ".doc",
    ".docx",
    ".txt",
    ".rtf",
    ".xls",
    ".xlsx",
    ".ppt",
    ".pptx",
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
    ".mp4",
    ".avi",
    ".mp3",
    ".wav",
  ],
  maxSizeInMB = 10,
}) => {
  const [isDragActive, setIsDragActive] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        onChange(file);
      }
    },
    [onChange]
  );

  const isImageType = (fileExtension: string) => {
    return (
      fileExtension.toLowerCase() === "jpg" ||
      fileExtension.toLowerCase() === "jpeg" ||
      fileExtension.toLowerCase() === "png" ||
      fileExtension.toLowerCase() === "gif"
    );
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: acceptedFileTypes.reduce((acc, type) => {
      acc[isImageType(type) ? `image/${type.replace(".", "")}` : `application/${type.replace(".", "")}`] = [type];
      return acc;
    }, {} as Record<string, string[]>),
    maxFiles: 1,
    disabled,
    maxSize: maxSizeInMB * 1024 * 1024,
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
    onDropAccepted: () => setIsDragActive(false),
    onDropRejected: () => setIsDragActive(false),
  });

  const removeFile = () => {
    onChange(null);
  };

  const removeExistingFile = () => {
    if (onRemoveExisting) {
      onRemoveExisting();
    }
  };

  // Determine which file to show
  const currentFile = value || (existingFileUrl ? ({ name: getFileName(existingFileUrl) } as File) : null);

  return (
    <div className="space-y-2">
      <div className={cn("w-full flex justify-center", className)}>
        {currentFile ? (
          <div className="relative w-full max-w-md">
            <div className="relative w-full p-4 rounded-lg border-2 border-dashed border-gray-300">
              <div className="flex items-center space-x-4">
                {/* File Extension Display */}
                <div
                  className={cn(
                    "flex items-center justify-center w-16 h-16 rounded-lg border-2 font-bold text-sm",
                    getFileExtensionColor(getFileExtension(currentFile.name))
                  )}
                >
                  {getFileExtension(currentFile.name)}
                </div>

                {/* File Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{currentFile.name}</p>
                  {currentFile.size && (
                    <p className="text-xs text-gray-500">{(currentFile.size / 1024 / 1024).toFixed(2)} MB</p>
                  )}
                  <div className="flex items-center mt-1">
                    <FileText className="h-3 w-3 text-gray-400 mr-1" />
                    <span className="text-xs text-gray-500">{getFileExtension(currentFile.name)} Datei</span>
                  </div>
                </div>

                {/* Remove Button */}
                {showRemoveButton && (
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="flex-shrink-0"
                    onClick={value ? removeFile : removeExistingFile}
                    disabled={disabled}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>

            {/* Option to replace file */}
            <div className="mt-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  if (value) {
                    removeFile();
                  } else if (existingFileUrl) {
                    removeExistingFile();
                  }
                }}
                disabled={disabled}
                className="w-full"
              >
                Datei ersetzen
              </Button>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-md">
            <div
              {...getRootProps()}
              className={cn(
                "flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-8 text-center hover:border-gray-400 focus:border-gray-400 focus:outline-none transition-colors",
                isDragActive && "border-blue-400 bg-blue-50",
                disabled && "cursor-not-allowed opacity-50",
                className
              )}
            >
              <input {...getInputProps()} />
              <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                  {isDragActive ? (
                    <Upload className="h-8 w-8 text-blue-600" />
                  ) : (
                    <FileText className="h-8 w-8 text-gray-400" />
                  )}
                </div>
                <div className="mt-4">
                  <p className="text-lg font-semibold">
                    {isDragActive ? "Datei hier ablegen..." : fileLabel || "Datei hochladen"}
                  </p>
                  <p className="mt-2 text-sm text-gray-500">
                    Ziehen Sie eine Datei hierher oder klicken Sie zum Auswählen
                  </p>
                  <p className="mt-1 text-xs text-gray-400">
                    {acceptedFileTypes.join(", ").toUpperCase()} bis zu {maxSizeInMB}MB
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
