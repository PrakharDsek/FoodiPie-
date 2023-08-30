import { toast } from "react-hot-toast";

const Notify = (type, message, icon) => {
  if (type === "error") {
    toast.error(message, {
      style: {
        fontFamily: "var(--kanti-font)",
      },
    });
  } else if (type === "custom") {
    toast(message, {
      icon: icon ? icon : "👏",
      style: {
        fontFamily: "var(--secondary-font)",
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  } else {
    toast.success(message, {
      style: {
        fontFamily: "var(--kanti-font)",
      },
    });
  }
};

export default Notify;
