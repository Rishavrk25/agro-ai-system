import { forwardRef } from "react";

const Input = forwardRef(function Input(
  { className = "", type = "text", ...props },
  ref
) {
  return (
    <input
      type={type}
      ref={ref}
      className={`flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-colors ${className}`}
      {...props}
    />
  );
});

export { Input };
export default Input;
