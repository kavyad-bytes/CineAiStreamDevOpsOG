import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(form.email, form.password);
      navigate("/");
    } catch {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen bg-[url('https://i.pinimg.com/1200x/30/35/16/303516b3d848265807856338aabd9572.jpg')] bg-cover bg-center">
      <div className="min-h-screen bg-black/70">
        <header className="px-8 py-6">
          <Link to="/" className="text-4xl font-black text-red-600">
            
          </Link>
        </header>

        <main className="flex justify-center px-4">
          <form
            onSubmit={submit}
            className="mt-10 w-full max-w-md rounded bg-black/80 px-10 py-12 text-white"
          >
            <h1 className="mb-8 text-3xl font-bold">Sign In</h1>

            {error && (
              <p className="mb-4 rounded bg-orange-600 px-4 py-3 text-sm">
                {error}
              </p>
            )}

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
              Sign In
            </button>

            <p className="mt-8 text-zinc-400">
              New to CineAI?{" "}
              <Link to="/register" className="text-white hover:underline">
                Sign up now.
              </Link>
            </p>
          </form>
        </main>
      </div>
    </div>
  );
}