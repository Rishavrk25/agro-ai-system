import { forwardRef } from "react";
import { Link } from "react-router-dom";

const variants = {
  default:
    "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
  outline:
    "border border-border bg-background hover:bg-muted text-foreground shadow-sm",
  secondary:
    "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm",
  ghost: "hover:bg-muted text-foreground",
  destructive:
    "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm",
};

const sizes = {
  sm: "h-9 px-3 text-sm rounded-md",
  default: "h-10 px-4 py-2 text-sm rounded-lg",
  lg: "h-12 px-6 text-base rounded-lg",
  icon: "h-10 w-10 rounded-lg",
};

const Button = forwardRef(function Button(
  {
    className = "",
    variant = "default",
    size = "default",
    asChild = false,
    to,
    children,
    ...props
  },
  ref
) {
  const classes = [
    "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
    variants[variant] || variants.default,
    sizes[size] || sizes.default,
    className,
  ].join(" ");

  // If `asChild` is used and children is a Link, clone with classes
  if (asChild && children?.type === Link) {
    return (
      <Link
        ref={ref}
        className={classes}
        to={children.props.to || children.props.href}
        {...children.props}
        {...props}
      >
        {children.props.children}
      </Link>
    );
  }

  // If `to` prop is provided, render as Link
  if (to) {
    return (
      <Link ref={ref} to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button ref={ref} className={classes} {...props}>
      {children}
    </button>
  );
});

export { Button };
export default Button;
