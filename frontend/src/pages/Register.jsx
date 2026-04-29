import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await register(form.email, form.password);
      navigate("/");
    } catch {
      setError("Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="px-8 py-6">
        <Link to="/" className="text-4xl font-black text-red-600">
          CINEAI
        </Link>
      </header>

      <main className="flex justify-center px-4">
        <form
          onSubmit={submit}
          className="mt-10 w-full max-w-md rounded bg-zinc-900 px-10 py-12"
        >
          <h1 className="mb-8 text-3xl font-bold">Create Account</h1>

          {error && <p className="mb-4 text-red-500">{error}</p>}

          <input
            className="mb-4 w-full rounded bg-zinc-800 px-4 py-4 outline-none focus:ring-2 focus:ring-red-600"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          <input
            className="mb-6 w-full rounded bg-zinc-800 px-4 py-4 outline-none focus:ring-2 focus:ring-red-600"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />

          <button className="w-full rounded bg-red-600 py-3 font-semibold hover:bg-red-700">
            Register
          </button>

          <p className="mt-8 text-zinc-400">
            Already registered?{" "}
            <Link to="/login" className="text-white hover:underline">
              Sign in.
            </Link>
          </p>
        </form>
      </main>
    </div>
  );
}