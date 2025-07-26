import { CheckCircle, X } from "lucide-react";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type?: "success" | "error" | "warning";
}

export default function SuccessModal({
  isOpen,
  onClose,
  title,
  message,
  type = "success",
}: SuccessModalProps) {
  if (!isOpen) return null;

  const getIconColor = () => {
    switch (type) {
      case "success":
        return "text-green-600";
      case "error":
        return "text-red-600";
      case "warning":
        return "text-amber-600";
      default:
        return "text-green-600";
    }
  };

  const getBgColor = () => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-200";
      case "error":
        return "bg-red-50 border-red-200";
      case "warning":
        return "bg-amber-50 border-amber-200";
      default:
        return "bg-green-50 border-green-200";
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/20 backdrop-blur-sm rounded-[8px]">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className={`p-6 ${getBgColor()}`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <CheckCircle className={`h-6 w-6 ${getIconColor()} mr-3`} />
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <p className="text-gray-700 mb-6">{message}</p>
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
