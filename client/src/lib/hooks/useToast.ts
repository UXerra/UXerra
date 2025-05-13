import { useCallback } from "react";
import { toast } from "@/hooks/use-toast";

export function useToast() {
  const showToast = useCallback((message: string, type: "success" | "error" | "info" = "info") => {
    toast({
      title: type === "success" ? "Success" : type === "error" ? "Error" : "Info",
      description: message,
      variant: type === "error" ? "destructive" : "default",
    });
  }, []);

  const dismissToast = useCallback((id?: string) => {
    toast.dismiss(id);
  }, []);

  return { showToast, dismissToast };
} 