import { forwardRef, ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type Variant = "primary" | "secondary" | "danger" | "ghost";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

export const Button = forwardRef<HTMLButtonElement, Props>(
  ({ variant = "primary", className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(
          "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
          {
            "bg-black text-white hover:bg-neutral-800 focus:ring-black":
              variant === "primary",
            "bg-neutral-200 text-black hover:bg-neutral-300":
              variant === "secondary",
            "bg-red-600 text-white hover:bg-red-700 focus:ring-red-600":
              variant === "danger",
            "hover:bg-neutral-100":
              variant === "ghost",
          },
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
