import type {
  UseFormRegister,
  FieldValues,
  Path,
  FieldError,
} from "react-hook-form";

type Option = {
  label: string;
  value: string | number;
};

type FormSelectProps<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  error?: FieldError;
  options: Option[];
  placeholder?: string;
};

const FormSelect = <T extends FieldValues>({
  label,
  name,
  register,
  error,
  options,
  placeholder = "Select an option",
}: FormSelectProps<T>) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>

      <select
        className={`text-sm w-full px-4 py-2 text-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 
          ${error ? "border-red-500" : "border-gray-300"}`}
        {...register(name)}
      >
        <option value="">{placeholder}</option>

        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

export default FormSelect;
