import React, { ChangeEvent } from "react";

interface InputProps {
  name: string;
  label: string;
  type: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const InputForm: React.FC<InputProps> = ({ name, label, type, value, onChange }) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-slate-500 dark:focus:border-slate-500 focus:outline-none focus:ring"
      />
    </div>
  );
};

export default InputForm;
  