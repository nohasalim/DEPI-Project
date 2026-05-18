import { FaCheck } from "react-icons/fa";
import Spinner from "../common/Spinner";

type SuccessModalProps = {
  title: string;
  description: string;
  loadingText?: string;
};

const SuccessModal = ({
  title,
  description,
  loadingText = "Setting up your project...",
}: SuccessModalProps) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 px-7 py-12">
      {/* Icon Section */}
      <div className="flex items-center justify-center space-x-2 w-16 h-16 rounded-full bg-linear-to-r from-green-100 to-green-200">
        <div className="flex items-center justify-center w-5 h-5 rounded-full border-2 text-green-600 border-green-600 animate-ping text-xs">
          <FaCheck />
        </div>
      </div>

      {/* Text Section */}
      <div className="flex flex-col items-center justify-center space-y-3">
        <h2 className="text-xl font-semibold text-black text-center mb-1.5">
          {title}
        </h2>
        <p className="text-center text-gray-400 text-sm">{description}</p>
      </div>

      {/* Optional Secondary Loading Section */}
      {loadingText && (
        <div className="flex items-center justify-center space-x-1.5">
          <Spinner type={null} />
          <span className="text-purple-600 text-xs">{loadingText}</span>
        </div>
      )}
    </div>
  );
};

export default SuccessModal;

// Usage
{
  /* <SuccessModal 
  title="Task Edited Successfully!"
  description="Edited task of your project."
  loadingText="Setting up your project..." 
/> */
}
