import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
  return (
    <Link
      to={`/watch/${movie.id}`}
      className="group overflow-hidden rounded bg-zinc-900 transition duration-300 hover:scale-105 hover:shadow-2xl"
    >
      <img
        src={movie.posterUrl}
        alt={movie.title}
        className="h-64 w-full object-cover"
      />

      <div className="p-3">
        <h3 className="truncate font-bold text-white">{movie.title}</h3>
        <p className="text-sm text-zinc-400">{movie.genre}</p>
      </div>
    </Link>
  );
}