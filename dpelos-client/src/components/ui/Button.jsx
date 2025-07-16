import { cn } from '../../lib/utils';

const variantStyles = {
  default: "bg-gold-500 text-black hover:bg-gold-600",
  outline: "border border-gold-500 bg-transparent hover:bg-gold-500/10",
  ghost: "bg-transparent hover:bg-gold-500/10",
};

const sizeStyles = {
  default: "h-10 px-4 py-2",
  sm: "h-9 px-3",
  lg: "h-11 px-8",
};

export function Button({ className, variant = "default", size = "default", children, ...props }) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 disabled:pointer-events-none disabled:opacity-50",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
