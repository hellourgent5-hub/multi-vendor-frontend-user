import { useState } from "react";
import { loginUser, registerUser } from "../api/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    await loginUser({ email, password });
    localStorage.setItem("user", email);
    window.location = "/";
  };

  const handleRegister = async () => {
    await registerUser({ email, password });
    alert("Registered! Now login.");
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl mb-4 font-bold">Login / Register</h1>

      <input className="border p-2 w-full" placeholder="Email"
        onChange={(e) => setEmail(e.target.value)} />

      <input className="border p-2 w-full mt-2" placeholder="Password" type="password"
        onChange={(e) => setPassword(e.target.value)} />

      <button onClick={handleLogin}
        className="mt-4 w-full bg-blue-600 text-white p-2 rounded">
        Login
      </button>

      <button onClick={handleRegister}
        className="mt-2 w-full bg-green-600 text-white p-2 rounded">
        Register
      </button>
    </div>
  );
}
