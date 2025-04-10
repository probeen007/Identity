
import { toast } from "sonner";

// Re-export sonner's toast
export { toast };

// Create a simplified useToast hook that returns the toast function
export const useToast = () => {
  return {
    toast,
    // Add an empty toasts array to satisfy any existing code that expects it
    toasts: []
  };
};
