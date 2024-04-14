"use client";

interface InputFieldProps {
  id: string;
  label: string;
  type: string;
  required?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  type,
  required,
  value,
  onChange,
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-semibold text-gray-800">
        {label}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        value={value}
        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
        onChange={onChange}
      />
    </div>
  );
};

export default InputField;
