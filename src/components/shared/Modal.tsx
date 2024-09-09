import { LucideX } from "lucide-react";
import {
  cloneElement,
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { useOnClickOutside } from "usehooks-ts";

type ModalContextType = {
  modalId: string;
  open: (modalId: string) => void;
  close: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

type ModalProps = {
  children: ReactNode;
};

export default function Modal({ children }: ModalProps) {
  const [modalId, setModalId] = useState("");

  function open(modalId: string) {
    setModalId(modalId);
  }

  function close() {
    setModalId("");
  }

  return (
    <ModalContext.Provider value={{ modalId, open, close }}>
      {children}
    </ModalContext.Provider>
  );
}

type OpenProps = {
  children: ReactElement;
  triggerModalId: string;
  disabled?: boolean;
  disabledOnClick?: () => void;
};

function Trigger({
  children,
  triggerModalId,
  disabled = false,
  disabledOnClick,
}: OpenProps) {
  const { open } = useModal();

  return cloneElement(children, {
    onClick: () => {
      if (disabled) {
        disabledOnClick?.();
        return;
      }
      open(triggerModalId);
    },
  });
}

type ContentProps = {
  children: ReactElement;
  contentModalId: string;
  closeIcon?: boolean;
};

function Content({ children, contentModalId, closeIcon = true }: ContentProps) {
  const { modalId, close } = useModal();
  const insideRef = useRef(null);
  useOnClickOutside(insideRef, close);

  if (modalId !== contentModalId) return null;

  return createPortal(
    <div className="fixed top-0 left-0 w-full h-screen bg-zinc-950/40 backdrop-blur z-50 transition-all">
      {closeIcon && (
        <LucideX className="fixed size-10 top-5 right-5 text-zinc-400 transition-all" />
      )}
      <div
        ref={insideRef}
        className="min-w-[400px] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-zinc-950 border border-zinc-800 p-5 transition-all"
      >
        {children}
      </div>
    </div>,
    document.body
  );
}

export function useModal() {
  const context = useContext(ModalContext);

  if (context === undefined)
    throw Error("Modal context used outside of ModalProvider.");

  return context;
}

Modal.Trigger = Trigger;
Modal.Content = Content;
