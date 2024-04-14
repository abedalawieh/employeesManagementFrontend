"use client";

interface ButtonProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  label: string;
  type?: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, label }) => {
  return (
    <div className="mt-2">
      {label === "Delete" ? (
        <button
          onClick={onClick}
          className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform  rounded-md bg-red-600 hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
        >
          {label}
        </button>
      ) : label === "Save" ? (
        <button
          onClick={onClick}
          className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform rounded-md bg-green-600 hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
        >
          {label}
        </button>
      ) : label === "Update" ? (
        <button
          onClick={onClick}
          className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform  bg-yellow-400 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
        >
          {label}
        </button>
      ) : (
        <button
          onClick={onClick}
          className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform  bg-black rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
        >
          {label}
        </button>
      )}
    </div>
  );
};

export default Button;
