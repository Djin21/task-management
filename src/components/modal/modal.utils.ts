import { MODAL_SIZES } from "./modal.constants.ts";

export function getModalSize(size: "sm" | "md" | "lg" | "full") {
    const modalSize = MODAL_SIZES[size] || MODAL_SIZES["md"];
    return modalSize;
}