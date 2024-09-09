import { ReactElement } from "react";

import Dialog from "./Dialog";
import { Button } from "../ui/button";
import { useModal } from "./Modal";

type DialogConfirmProps = {
  icon?: ReactElement;
  title: string;
  text: string;
  confirmText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
};

export default function DialogConfirm({
  icon,
  title,
  text,
  confirmText,
  onConfirm,
  onCancel,
}: DialogConfirmProps) {
  const { close } = useModal();

  return (
    <Dialog icon={icon} title={title} text={text}>
      <div className="flex justify-between">
        <Button
          variant="secondary"
          onClick={() => {
            onCancel?.();
            close();
          }}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            onConfirm();
            close();
          }}
        >
          {confirmText || "Confirm"}
        </Button>
      </div>
    </Dialog>
  );
}
