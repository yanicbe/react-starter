import { ReactNode } from "react";
import { Button } from "./button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";

interface ConfirmationDialogProps {
  children: ReactNode;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void | Promise<void>;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  disabled?: boolean;
}

const ConfirmationDialog = ({
  children: trigger,
  title,
  description,
  confirmText = "Bestätigen",
  cancelText = "Abbrechen",
  onConfirm,
  variant = "default",
  disabled = false,
}: ConfirmationDialogProps) => {
  const handleConfirm = async () => {
    await onConfirm();
  };

  return (
    <Dialog>
      <DialogTrigger asChild onClick={(e) => e.stopPropagation()}>
        {trigger}
      </DialogTrigger>
      <div onClick={(e) => e.stopPropagation()}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            {description && <DialogDescription>{description}</DialogDescription>}
          </DialogHeader>
          <DialogFooter className="flex gap-2 sm:justify-start">
            <DialogTrigger asChild onClick={(e) => e.stopPropagation()}>
              <Button type="button" variant="outline" className="w-full">
                {cancelText}
              </Button>
            </DialogTrigger>
            <Button
              type="button"
              variant={variant}
              onClick={async (e) => {
                e.stopPropagation();
                await handleConfirm();
              }}
              disabled={disabled}
              className="w-full"
            >
              {confirmText}
            </Button>
          </DialogFooter>
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default ConfirmationDialog;
