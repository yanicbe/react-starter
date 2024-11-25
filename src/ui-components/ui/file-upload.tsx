import useApiRequest from "@/lib/hooks/use-request";
import { FileUp, Trash2Icon } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { Button } from "./button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import { H2 } from "./headings";
import { Input } from "./input";

const FileUpload = ({
  defaultUpload,
  route,
  baseImg,
  onUpload,
  onFileAdded,
  heading,
  size,
  imageLabel,
}: {
  defaultUpload?: boolean;
  route: string;
  baseImg: string;
  onUpload?: () => void;
  onFileAdded?: () => void;
  heading?: string;
  size?: "default" | "small";
  imageLabel?: string;
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [confIsOpen, setConfIsOpen] = useState(false);
  const { apiRequest, apiFileRequest } = useApiRequest();
  const [file, setFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string>(baseImg);
  const [fileSize, setFileSize] = useState<number>(0);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);

    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      handleFileDrop(event.dataTransfer.files);
    }
  };

  const uploadFile = useCallback(async () => {
    if (file && fileSize <= 500000) {
      const response = await apiFileRequest<string>(route, "POST", file, {
        formdataName: "file",
      });

      if (response.status < 300 && response.status >= 200) {
        if (onUpload) {
          onUpload();
        }

        setImageSrc(URL.createObjectURL(file));
        setFile(null);
      }
    }
  }, [file, fileSize, apiFileRequest, route, onUpload]);

  useEffect(() => {
    if (defaultUpload === undefined || defaultUpload === true) {
      uploadFile();
    }
  }, [defaultUpload, file, uploadFile]);

  const handleFileDrop = (files: FileList | null) => {
    if (files?.length === 0 || !files) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    const filteredFiles = Array.from(files).filter((file) => allowedTypes.includes(file.type));
    handleUpload(filteredFiles[0]);
  };

  const handleUploadClick = () => {
    const uploadBtn = document.querySelector(`#uploadBtn-${imageLabel}`) as HTMLButtonElement | null;
    if (uploadBtn) {
      uploadBtn.click();
    }
  };

  const handleUpload = (file: File) => {
    setFile(file);
    setFileSize(file.size);
    if (onFileAdded) {
      onFileAdded();
    }
  };

  const handleDeleteClick = async () => {
    setFile(null);
    setConfIsOpen(false);
    if (imageSrc) {
      await apiRequest<string>(route, "DELETE");
      setImageSrc("");
    }
  };

  return (
    <div>
      <div className={`mt-4 ${size === "small" ? "flex gap-2" : ""}`}>
        {heading && <H2>{heading}</H2>}
        <div
          className={`flex flex-col justify-center ${
            size && size === "small" ? "max-h-80 max-w-80 w-60 h-60" : "min-h-80 my-6"
          } ${isDragging ? "text-slate-50" : "text-slate-400"} ${
            imageSrc || file ? "" : "p-8 bg-slate-200 "
          } gap-6 items-center rounded-lg `}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleUploadClick}
        >
          {imageSrc || file ? (
            <>
              {file ? (
                <img
                  src={URL.createObjectURL(file)}
                  alt="Location"
                  className="rounded-lg w-full h-full border border-solid cursor-pointer object-cover"
                />
              ) : (
                <img
                  src={imageSrc}
                  alt="Location"
                  className="rounded-lg w-full h-full border border-solid cursor-pointer object-cover"
                />
              )}
            </>
          ) : (
            <>
              <FileUp size={size && size === "small" ? 40 : 80} />
              <p className={`${size && size === "small" ? "text-sm" : "text-lg"} text-center font-medium`}>
                Foto per Drag-and-Drop in dieses Feld ziehen
                <br /> Oder über den Button „Foto hochladen“ auswählen
              </p>
            </>
          )}
        </div>
        <div className={`gap-4 flex ${size && size === "small" ? "justify-end flex-col" : "justify-start"}`}>
          <Button className="flex gap-2 p-2 text-white" variant="outline" onClick={handleUploadClick}>
            <FileUp />
            <span>{imageLabel ?? "Foto"} hochladen</span>
          </Button>
          <Dialog open={confIsOpen} onOpenChange={setConfIsOpen}>
            <DialogTrigger asChild>
              <Button className="flex gap-2 p-2" variant="outline">
                <Trash2Icon />
                <span>{imageLabel ?? "Foto"} löschen</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{imageLabel ?? "Foto"} löschen</DialogTitle>
                <DialogDescription>
                  Sind Sie sich sicher, dass sie das {imageLabel ?? "Foto"} unwiderruflich löschen willst?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button className="flex gap-2 p-2 text-white" variant="outline">
                    Close
                  </Button>
                </DialogClose>
                <Button className="flex gap-2 p-2" variant="outline" onClick={handleDeleteClick}>
                  Löschen
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog
            open={fileSize > 500000}
            onOpenChange={() => {
              setFile(null);
              setFileSize(0);
              if (inputRef.current) {
                inputRef.current.value = "";
              }
            }}
          >
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{imageLabel ?? "Foto"} löschen</DialogTitle>
                <DialogDescription>
                  Die Datei ist zu groß. Bitte wählen Sie eine Datei mit einer maximalen Größe von 0.5MB.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button className="flex gap-2 p-2 text-white" variant="outline">
                    Close
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <label id={`uploadBtn-${imageLabel}`}>
          <Input
            className="hidden"
            type="file"
            accept="image/png, image/jpeg"
            ref={inputRef}
            onChange={(e) => {
              e.preventDefault();
              if (e.target?.files && e.target?.files.length > 0) {
                handleUpload(e.target.files[0]);
              }
            }}
          />
        </label>
      </div>
      <p className="text-sm text-slate-400">
        <span className="text-slate-600">Hinweis:</span> Maximale Dateigröße: 0.5MB
      </p>
    </div>
  );
};

export default FileUpload;
