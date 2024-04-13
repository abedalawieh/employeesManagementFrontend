"use client";

interface ButtonProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  label: string;
  type?: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, label }) => {
  return (
    <div className="mt-2">
      <button
        onClick={onClick}
        className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-black rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
      >
        {label}
      </button>
    </div>
  );
};

export default Button;
