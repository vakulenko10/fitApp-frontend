import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner";

const Toaster = ({
  bg,
  textColor,
  borderColor,
  ...props
}) => {
  const { theme = "system" } = useTheme()

  return (
    (<Sonner
      theme={theme}
      className="toaster group"
      style={
        {
          "--normal-bg": `var(--${bg?bg:'background'})`,
          "--normal-text": `var(--${textColor?textColor:'secondary'})`,
          "--normal-border": `var(--${borderColor?borderColor:'none'})`
        }
      }
      {...props} />)
  );
}

export { Toaster }
