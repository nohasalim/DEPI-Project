import { RxCross2 } from "react-icons/rx";
import Spinner from "../common/Spinner";

type ErrorModalProps = {
  title?: string;
  errorMessage: string;
  retryText?: string;
};

const ErrorModal = ({
  title = "Operation Failed!", // قيمة افتراضية
  errorMessage,
  retryText = "Please try again another time...", // قيمة افتراضية
}: ErrorModalProps) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 px-7 py-12">
      <div className="flex items-center justify-center space-x-2 w-16 h-16 rounded-full bg-linear-to-r from-red-200 to-red-300">
        <div className="flex items-center justify-center w-5 h-5 rounded-full border-2 text-red-600 border-red-600 animate-ping text-sm">
          <RxCross2 />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center space-y-3">
        <h2 className="text-xl font-semibold text-black text-center mb-1.5">
          {title}
        </h2>
        <p className="text-center text-gray-400 text-sm">{errorMessage}</p>
      </div>

      <div className="flex items-center justify-center space-x-1.5">
        <Spinner type={null} />
        <span className="text-purple-600 text-xs">{retryText}</span>
      </div>
    </div>
  );
};

export default ErrorModal;
