import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-2xl gap-5 text-sm font-medium font-open-sans capitalize transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive ",
  {
    variants: {
      variant: {
        default: "bg-button  text-white shadow-xs hover:bg-button/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive/90  hover:text-black/70  focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
        outline:
          "border border-input bg-background shadow-xs hover:bg-background/80 hover:text-foreground/65",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        accent: "bg-accent text-white shadow-xs hover:bg-accent/90",
        accentNegative:
          "bg-accent-negative  text-white shadow-xs hover:bg-accent-negative/90",
        submit:
          "bg-button-submit text-white shadow-xs hover:bg-button-submit/90 rounded-sm  ",
        grey: "bg-muted-darker text-muted-darker-foreground rounded-sm hover:bg-muted-darker/95 hover:text-muted-darker-foreground/85 "
      },
      size: {
        default: "h-[2rem] px-4 py-2 has-[>svg]:px-3",//for all the buttons except for submit and grey
        sm: " rounded-md gap-1.5 py-2 px-3 has-[>svg]:px-2.5",
        customSm:
          "h-[1.5rem] w-[4.44rem] md:h-[2.5rem] md:w-[10rem] lg:h-[3.125rem] lg:w-[11.25rem] rounded-md px-4",

        /*For small buttons, such as those for selecting calorie deficit, maintenance, and surplus, as well as similar-sized buttons.*/
        lg: " text-md rounded-md py-1 px-5 has-[>svg]:px-5",//for submit and grey buttons
        veryLg:
          "h-[3.25rem] w-[20.625rem] md:h-[2.75rem] md:w-[39.5rem] lg:h-[3.25rem] lg:w-[51rem] rounded-md px-6" /*For large buttons such as Calculate, Create New Receipt, etc., but it's better to double-check.*/,
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({ className, variant, size, asChild = false, ...props }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
