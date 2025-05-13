import { createContext, useContext, ReactNode } from "react";
import { useAuth } from "@/lib/hooks/useAuth";

interface AuthContextType {
  user: {
    id: string;
    email: string;
    name: string;
  } | null;
  isLoading: boolean;
  login: (credentials: { email: string; password: string }) => void;
  register: (credentials: { email: string; password: string; name: string }) => void;
  logout: () => void;
  isLoggingIn: boolean;
  isRegistering: boolean;
  isLoggingOut: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
} 