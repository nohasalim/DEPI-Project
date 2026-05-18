import type {
  UseFormRegister,
  FieldValues,
  Path,
  FieldError,
} from "react-hook-form";

type FormTextAreaProps<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  error?: FieldError;
  placeholder: string;
  helperText?: string;
};

const FormTextArea = <T extends FieldValues>({
  label,
  name,
  register,
  error,
  placeholder,
  helperText,
}: FormTextAreaProps<T>) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>

      <textarea
        placeholder={placeholder}
        className={`w-full px-4 py-2 text-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 
            ${error ? "border-red-500" : "border-gray-300"} 
            placeholder:text-sm`}
        {...register(name)}
      />

      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}

      {helperText && <p className="mt-1 text-xs text-gray-400">{helperText}</p>}
    </div>
  );
};

export default FormTextArea;
