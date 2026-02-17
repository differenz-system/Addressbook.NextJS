"use client";

import { forwardRef } from "react";

type Props = {
  label: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, Props>(
  ({ label, error, ...props }, ref) => {
    return (
      <div>
        <label className="mb-1 block text-sm font-medium">
          {label}
        </label>
        <input
          ref={ref}
          {...props}
          aria-invalid={!!error}
          className={`w-full rounded border px-3 py-2 outline-none transition ${
            error
              ? "border-red-400 focus:ring-2 focus:ring-red-200"
              : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          }`}
        />
        <p className="mt-1 min-h-[18px] text-xs text-red-600">
          {error}
        </p>
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
