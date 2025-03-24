import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner";

const Toaster = ({
  
  ...props
}) => {
  const { theme = "system" } = useTheme()
  return (
    (<Sonner
      
      theme={theme}
      className="toaster group bg-red-300"
      style={
        {
          "--normal-bg": `var(--popover)`,
          "--normal-text": `var(--secondary)`,
          "--normal-border": `var(--none)`,

        }
      }
      {...props} />)
  );
}

export { Toaster }
