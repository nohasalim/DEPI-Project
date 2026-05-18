import Spinner from "../common/Spinner";

type LoadingStep = string;

type LoadingModalProps = {
  title: string;
  description: string;
  steps: LoadingStep[];
};

const LoadingModal = ({ title, description, steps }: LoadingModalProps) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 px-7 py-12">
      <Spinner type="loading" />

      <div className="flex flex-col items-center justify-center space-y-3">
        <h2 className="text-xl font-semibold text-black text-center mb-1.5">
          {title}
        </h2>
        <p className="text-center text-gray-400 text-sm">{description}</p>
      </div>

      <div className="self-start space-y-2">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center space-x-2">
            <span className="block w-1.5 h-1.5 rounded-full bg-purple-500 animate-ping"></span>
            <span className="block text-xs text-gray-400">{step}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingModal;

// Usage
{
  /* <ProcessingState 
  title="Editing Task..."
  description="We are analyzing your task details and editing the task."
  steps={[
    "Understanding task requirements",
    "Structuring task details",
    "Editing task of your project"
  ]}
/> */
}
