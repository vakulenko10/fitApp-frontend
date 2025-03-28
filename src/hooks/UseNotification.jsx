import { toast } from "sonner";
import { Link } from "react-router-dom";

export function useNotification() {
  const triggerToast = (message, type = "success", link = null) => {
    toast[type](
      <div>
        <p><strong>{type === "success" ? "Success:" : "Error:"}</strong> {message}</p>
        {link && (
          <Link to={link} className="text-muted-foreground underline">
            Go to page
          </Link>
        )}
      </div>,
      {
        action: {
          label: "Close",
          onClick: () => toast.dismiss(),
          style: {
            background: 'var(--primary)'
          }
        },
        style: {
          background: `${type=='success'?'var(--accent)':'red'}`,
          color: `${type=='success'?'var(--secondary)':'var(--secondary-foreground)'}`
        }
      }
    );
  };

  return { triggerToast };
}
