import { Link, useParams } from "react-router-dom";

export default function Watch() {
  const { id } = useParams();

  return (
    <main className="min-h-screen bg-black pt-24 text-white">
      <div className="mx-auto max-w-6xl px-6">
        <Link to="/" className="mb-6 inline-block text-zinc-400 hover:text-white">
          ← Back to movies
        </Link>

        <video
          controls
          autoPlay
          src={`http://localhost:8081/api/movies/stream/${id}`}
          className="aspect-video w-full rounded bg-zinc-950 shadow-2xl"
        />
      </div>
    </main>
  );
}