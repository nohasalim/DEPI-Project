import { type ReactNode } from "react";

type ModalHeaderProps = {
  title: string;
  icon?: ReactNode;
  subtitle?: string;
};

const ModalHeader = ({ title, icon, subtitle }: ModalHeaderProps) => {
  return (
    <div className="w-xs bg-gradient-primary text-white p-4 xs:w-sm md:w-xl">
      <h2 className="text-xl font-semibold mb-1 leading-8 capitalize flex items-center space-x-1.5">
        {icon && icon}
        <span className="block text-2xl">{title}</span>
      </h2>

      {subtitle && (
        <p className="text-left mx-auto w-11/12 leading-6 text-[16px]">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default ModalHeader;
