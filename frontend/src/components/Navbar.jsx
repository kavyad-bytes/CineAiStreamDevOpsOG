import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="fixed left-0 top-0 z-50 flex w-full items-center justify-between bg-gradient-to-b from-black to-transparent px-8 py-5 text-white">
      <div className="flex items-center gap-8">
        <Link to="/" className="text-3xl font-black tracking-tight text-red-600">
          CINEAI
        </Link>

        {user && (
          <div className="hidden gap-5 text-sm md:flex">
            <Link to="/" className="hover:text-zinc-300">Home</Link>
            {user.role === "ADMIN" && (
              <Link to="/upload" className="hover:text-zinc-300">Upload</Link>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center gap-4 text-sm">
        {user ? (
          <>
            <span className="hidden text-zinc-300 sm:inline">{user.email}</span>
            <button
              onClick={logout}
              className="rounded bg-red-600 px-4 py-2 font-semibold hover:bg-red-700"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-zinc-300">Login</Link>
            <Link to="/register" className="rounded bg-red-600 px-4 py-2 font-semibold">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}