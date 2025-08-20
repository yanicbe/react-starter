import { cn } from "@/lib/utils/cn";
import { Image as ImageIcon, Upload, X } from "lucide-react";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "./button";

type AspectRatio = "1:1" | "16:9" | "9:16" | "4:3" | "3:4" | "auto";

interface ImageUploadProps {
  value?: File | null;
  onChange: (file: File | null) => void;
  recommendedAspectRatio?: AspectRatio;
  disabled?: boolean;
  className?: string;
  imageLabel?: string;
  aspectRatio?: AspectRatio;
  existingImageUrl?: string;
  onRemoveExisting?: () => void;
  showRemoveButton?: boolean;
}

const aspectRatioClasses: Record<AspectRatio, string> = {
  "1:1": "aspect-square",
  "16:9": "aspect-video",
  "9:16": "aspect-[9/16]",
  "4:3": "aspect-[4/3]",
  "3:4": "aspect-[3/4]",
  auto: "aspect-auto min-h-[200px]",
};

export const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  recommendedAspectRatio = "4:5",
  disabled = false,
  className,
  imageLabel,
  aspectRatio = "auto",
  existingImageUrl,
  onRemoveExisting,
  showRemoveButton = true,
}) => {
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        onChange(file);

        // Create preview URL
        const reader = new FileReader();
        reader.onload = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    },
    [onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
    },
    maxFiles: 1,
    disabled,
    maxSize: 5 * 1024 * 1024, // 5MB
  });

  const removeImage = () => {
    onChange(null);
    setPreview(null);
  };

  const removeExistingImage = () => {
    if (onRemoveExisting) {
      onRemoveExisting();
    }
  };

  React.useEffect(() => {
    if (value) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(value);
    } else {
      setPreview(null);
    }
  }, [value]);

  // Show preview if there's a new file, otherwise show existing image
  const imageToShow = preview || existingImageUrl;

  return (
    <div className="space-y-2">
      {recommendedAspectRatio && (
        <p className="text-xs text-gray-500">Empfohlenes Seitenverhältnis: {recommendedAspectRatio}</p>
      )}
      <div className={cn("w-full flex justify-center", className)}>
        {imageToShow ? (
          <div className="relative max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
            <div
              className={cn(
                "relative w-full overflow-hidden rounded-lg border-2 border-dashed border-gray-300 max-h-[200px] sm:max-h-[250px] md:max-h-[300px] lg:max-h-[350px] xl:max-h-[400px]",
                aspectRatioClasses[aspectRatio]
              )}
            >
              <img src={imageToShow} alt="Preview" className="h-full w-full object-contain" />
              {showRemoveButton && (
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute right-2 top-2"
                  onClick={preview ? removeImage : removeExistingImage}
                  disabled={disabled}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            {/* Option to replace image */}
            <div className="mt-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  // Clear current image to show upload area
                  if (preview) {
                    removeImage();
                  } else if (existingImageUrl) {
                    removeExistingImage();
                  }
                }}
                disabled={disabled}
                className="w-full"
              >
                Bild ersetzen
              </Button>
            </div>
          </div>
        ) : (
          <div className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
            <div
              {...getRootProps()}
              className={cn(
                "flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-6 text-center hover:border-gray-400 focus:border-gray-400 focus:outline-none max-h-[200px] sm:max-h-[250px] md:max-h-[300px] lg:max-h-[350px] xl:max-h-[400px]",
                aspectRatioClasses[aspectRatio],
                isDragActive && "border-blue-400 bg-blue-50",
                disabled && "cursor-not-allowed opacity-50",
                className
              )}
            >
              <input {...getInputProps()} />
              <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
                <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-gray-100">
                  {isDragActive ? (
                    <Upload className="h-8 w-8 sm:h-10 sm:w-10 text-blue-600" />
                  ) : (
                    <ImageIcon className="h-8 w-8 sm:h-10 sm:w-10 text-gray-400" />
                  )}
                </div>
                <div className="mt-4">
                  <p className="text-base sm:text-lg font-semibold">
                    {isDragActive ? "Bild hier ablegen..." : imageLabel || "Bild hochladen"}
                  </p>
                  <p className="mt-2 text-xs sm:text-sm text-gray-500">
                    Ziehen Sie ein Bild hierher oder klicken Sie zum Auswählen
                  </p>
                  <p className="mt-1 text-xs text-gray-400">PNG, JPG, GIF bis zu 5MB</p>
                  {aspectRatio !== "auto" && (
                    <p className="mt-1 text-xs text-gray-400">Seitenverhältnis: {aspectRatio}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
