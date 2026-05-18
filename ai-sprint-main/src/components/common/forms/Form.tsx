import type { FieldValues, UseFormHandleSubmit } from "react-hook-form";

type FormProps<T extends FieldValues> = {
  handleSubmit: UseFormHandleSubmit<T>;
  onSubmit: (data: T) => void;
  children: React.ReactNode;
  className?: string;
};

const Form = <T extends FieldValues>({
  handleSubmit,
  onSubmit,
  children,
  className = "w-full space-y-2",
}: FormProps<T>) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={className} noValidate>
      {children}
    </form>
  );
};

export default Form;
