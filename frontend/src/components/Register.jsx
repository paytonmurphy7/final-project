import { useState } from "react";
import { getApiBaseUrl } from "../api.js";

export default function Register({ onSwitchToLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${getApiBaseUrl()}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        setError("Registration failed.");
        return;
      }

      alert("Account created! You can now log in.");
      onSwitchToLogin();
    } catch {
      setError("Registration failed.");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xs space-y-3 rounded border border-slate-200 bg-white p-5"
      >
        <h1 className="text-lg font-semibold text-slate-800">Register</h1>

        {error ? <p className="text-sm text-red-600">{error}</p> : null}

        <input
          className="w-full rounded border border-slate-300 px-2 py-1.5"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />

        <input
          type="password"
          className="w-full rounded border border-slate-300 px-2 py-1.5"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />

        <button
          type="submit"
          className="w-full rounded bg-slate-800 py-2 text-sm font-medium text-white"
        >
          Create Account
        </button>

        <p className="text-sm text-center text-blue-600 cursor-pointer" onClick={onSwitchToLogin}>
          Back to login
        </p>
      </form>
    </div>
  );
}
