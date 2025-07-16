import { useEffect } from "react";
import useAuthStore from "../../stores/authStore";

export default function AuthInitializer({ children }) {
  const fetchUserInfo = useAuthStore((state) => state.fetchUserInfo);

  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo]);

  return children;

}
