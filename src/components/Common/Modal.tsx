import { useEffect } from "react";
import { createPortal } from "react-dom";
import css from "./Modal.module.css";

interface Props {
  onClose: () => void;
  children: React.ReactNode;
}

export default function ModalWrapper({ onClose, children }: Props) {
  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const escHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", escHandler);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", escHandler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return createPortal(
    <div className={css.backdrop} onClick={handleClickOutside} role="dialog" aria-modal="true">
      <div className={css.modal}>
        <button className={css.closeButton} aria-label="Close modal" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}
