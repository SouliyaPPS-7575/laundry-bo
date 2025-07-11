import { useNavigate } from "@tanstack/react-router";
import { useZitadelAuth } from "./useZitadelAuth";

export const useLogout = () => {
  const navigate = useNavigate();
  const { signout } = useZitadelAuth();

  const handleLogout = async () => {
    try {
      await signout();
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