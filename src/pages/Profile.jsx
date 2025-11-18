import { useEffect, useState } from "react";
import { getCurrentUser } from "../api";
import LogoutButton from "../components/LogoutButton";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getCurrentUser()
      .then(res => setUser(res.data))
      .catch(err => console.error(err));
  }, []);

  if (!user) return <div>Loading profile...</div>;

  return (
    <div>
      <h2>Profile</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <LogoutButton />
    </div>
  );
}
