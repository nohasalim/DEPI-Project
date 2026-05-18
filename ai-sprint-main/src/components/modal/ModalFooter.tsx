import { type ReactNode } from "react";
import Button from "../common/Button";

interface ModalFooterProps {
  label: string;
  icon?: ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
  disabled?: boolean;
}

const ModalFooter = ({ label, icon, onConfirm, onCancel, disabled }: ModalFooterProps) => {
  return (
    <div className="mt-3 flex items-center justify-end space-x-2">
      <Button
        type="button"
        onClick={onCancel}
        label="Cancel"
        className={`border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 font-medium shadow-sm hover:-translate-y-0.5`}
      />
      <Button
        type="submit"
        onClick={onConfirm}
        label={label}
        disabled={disabled}
        className="bg-linear-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold flex items-center justify-center space-x-1 shadow-sm hover:-translate-y-0.5"
        icon={icon}
      />
    </div>
  );
};

export default ModalFooter;
