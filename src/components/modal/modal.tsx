import React, { useState } from "react";
import "./modal.css";
import { getModalSize } from "./modal.utils.ts";
import { X } from "lucide-react";

type BaseDivAttributes = React.ComponentPropsWithoutRef<"div">;

interface taskModalProps extends BaseDivAttributes {
  open: boolean,
  close: Function,
  title?: string,
  bg?: boolean, // true 
  isScroll?: boolean,// false
  size?: "sm" | "md" | "lg" | "full",
}

function Modal({
  open,
  close,
  title,
  bg = true,  
  isScroll = false,
  size,
  children,
  ...props
} : taskModalProps) {
  
  const modalSize = size ? getModalSize(size) : getModalSize("md");

  const modalPosition = open ? "flex" : "hidden";
  const openModalBackdropAnimation = open && "modal-backdrop-animate";
  const openModalContentAnimation = open && "modal-animate";
  const modalScrollStyle = isScroll ? "overflow-y-auto" : "items-center"

  return (
    <div
      data-testid="modal"
      className={`fixed z-50 inset-0 ${modalPosition} justify-center items-center`}
      {...props}
    >
      <div
        className={`absolute inset-0 bg-white/40 backdrop-blur ${openModalBackdropAnimation}`}
      ></div>
      {!bg && (
        <div
          className={`relative ${modalSize} py-5 rounded-md bg-white shadow-xl ${openModalContentAnimation}`}
        >
          {children}
        </div>
      )}
      {bg && (
        <div className={`absolute inset-0 flex justify-center ${modalScrollStyle} md:py-5`}>
        <div
          className={`relative ${modalSize}`}
        >
          <div className={`bg-white p-5 rounded-md shadow-xl ${openModalContentAnimation}`}>
            <button className="absolute right-4 top-4" onClick={() => close()}> <X size={25} className="duration-300 hover:text-red-500 hover:scale-[1.4]" /> </button>
          <div>
            <h2 className="mb-3 text-xl font-semibold">{title || "Titre du modal"}</h2>
            <hr className="mb-5 border-neutral-400" />
          </div>
          {children}
          </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Modal;
