import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "../queryClient";
import { useNavigate } from "react-router-dom";
import { useToast } from "./useToast";

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials extends LoginCredentials {
  name: string;
}

interface User {
  id: string;
  email: string;
  name: string;
}

export function useAuth() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const { data: user, isLoading } = useQuery<User>({
    queryKey: ["user"],
    queryFn: () => apiRequest("/auth/me"),
    retry: false,
  });

  const login = useMutation({
    mutationFn: (credentials: LoginCredentials) =>
      apiRequest<{ token: string }>("/auth/login", {
        method: "POST",
        body: JSON.stringify(credentials),
      }),
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate("/dashboard");
      showToast("Successfully logged in", "success");
    },
    onError: (error: Error) => {
      showToast(error.message, "error");
    },
  });

  const register = useMutation({
    mutationFn: (credentials: RegisterCredentials) =>
      apiRequest<{ token: string }>("/auth/register", {
        method: "POST",
        body: JSON.stringify(credentials),
      }),
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate("/dashboard");
      showToast("Successfully registered", "success");
    },
    onError: (error: Error) => {
      showToast(error.message, "error");
    },
  });

  const logout = useMutation({
    mutationFn: () =>
      apiRequest("/auth/logout", {
        method: "POST",
      }),
    onSuccess: () => {
      localStorage.removeItem("token");
      queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate("/");
      showToast("Successfully logged out", "success");
    },
    onError: (error: Error) => {
      showToast(error.message, "error");
    },
  });

  return {
    user,
    isLoading,
    login: login.mutate,
    register: register.mutate,
    logout: logout.mutate,
    isLoggingIn: login.isPending,
    isRegistering: register.isPending,
    isLoggingOut: logout.isPending,
  };
} 