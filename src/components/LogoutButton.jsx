import { logoutUser } from "../api";
import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      localStorage.removeItem("token"); // remove JWT if used
      alert("Logged out!");
      navigate("/login");
    } catch {
      alert("Logout failed");
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
}
