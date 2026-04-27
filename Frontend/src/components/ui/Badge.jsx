const variants = {
  default: "bg-primary text-primary-foreground",
  secondary: "bg-secondary text-secondary-foreground",
  outline: "border border-border text-foreground bg-transparent",
  destructive: "bg-destructive text-destructive-foreground",
};

export function Badge({
  variant = "default",
  className = "",
  children,
  ...props
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors ${
        variants[variant] || variants.default
      } ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}

export default Badge;
