import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "./useAuth";

export const useLogout = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate({ to: "/login" });
    } catch (error) {
      console.error("Zitadel logout failed:", error);
      // Handle logout error
    }
  };

  return {
    handleLogout,
  };
};