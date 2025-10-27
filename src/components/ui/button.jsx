import * as React from "react";
import { cn } from "../../lib/utils";

const buttonVariants = ({ variant = "default", size = "default" }) => {
  const base = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

  const variants = {
    default: "bg-[#E673AC] text-white hover:bg-[#d95b9c]",
    ghost: "hover:bg-[#E673AC]/10 hover:text-[#E673AC]",
    outline: "border border-[#E673AC] bg-transparent hover:bg-[#E673AC]/10",
  };

  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10",
  };

  return `${base} ${variants[variant] || variants.default} ${sizes[size] || sizes.default}`;
};

const Button = React.forwardRef(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
