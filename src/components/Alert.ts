import Swal from "sweetalert2";

function Alert(
  message: string,
  icon: "success" | "error" | "warning" | "info" = "info"
) {
  Swal.fire({
    text: message,
    icon: icon,
    confirmButtonText: "Close",
    confirmButtonColor: "#3085d6",
  });
}

export default Alert;
