import Swal from "sweetalert2";

// Simple alert with optional auto-close
function Alert(
  message: string,
  icon: "success" | "error" | "warning" | "info" = "info"
) {
  const isAutoClose = icon === "success" || icon === "info";

  Swal.fire({
    text: message,
    icon: icon,
    timer: isAutoClose ? 2000 : undefined,
    showConfirmButton: !isAutoClose,
    confirmButtonText: "Close",
    confirmButtonColor: "#3085d6",
    timerProgressBar: isAutoClose,
  });
}

// Confirmation modal (replaces window.confirm)
export async function ConfirmAlert(
  title: string,
  text: string = "",
  confirmText: string = "Yes",
  cancelText: string = "Cancel"
): Promise<boolean> {
  const result = await Swal.fire({
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
  });

  return result.isConfirmed;
}

export default Alert;
