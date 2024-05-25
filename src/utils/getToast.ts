import toast  from "react-hot-toast";

export const successToast = () => toast.success("Success toast.");
export const errorToast = () => toast.error("Error toast.");
export const loadingToast = () => toast.loading("Loading toast...");