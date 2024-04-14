import toast, { Renderable } from "react-hot-toast";

type Status = "success" | "warning" | "error" | "info";

type Toast = { message: string; status: Status };

const statusToIcon = {
  success: "✅",
  warning: "⚠️",
  error: "❌",
  info: "🔔",
};

const statusToSoundFile = {
  success: "/success.mp3",
  warning: "/warning.mp3",
  error: "/error.mp3",
  info: "/info.mp3",
};

const chooseIcon = (status: Status) => statusToIcon[status] || statusToIcon.info;

const chooseNotificationSound = (status: Status) => new Audio(statusToSoundFile[status] || statusToSoundFile.info);

export const showToast = async ({ message, status }: Toast) => {
  toast(message, {
    style: {
      borderRadius: "10px",
      background: "#333",
      color: "#fff",
      boxShadow: "0 4px 14px 0 rgba(0, 0, 0, 0.1)",
    },
    icon: chooseIcon(status),
    duration: 4000,
    position: "top-right",
  });
  const sound = chooseNotificationSound(status);
  sound.play();

  return sound;
};
