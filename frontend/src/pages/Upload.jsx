import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

export default function Upload() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    genre: "",
    description: "",
    summary: "",
    posterUrl: "",
  });

  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const update = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = new FormData();

      data.append(
        "movie",
        new Blob([JSON.stringify(form)], { type: "application/json" })
      );

      data.append("file", file);

      await api.post("/movies/upload", data);
      navigate("/");
    } catch {
      setError("Upload failed. Check backend, MinIO, and admin login.");
    }
  };

  return (
    <main className="min-h-screen bg-black px-4 pt-28 text-white">
      <form
        onSubmit={submit}
        className="mx-auto max-w-2xl rounded bg-zinc-900 p-8 shadow-xl"
      >
        <h1 className="mb-6 text-3xl font-bold">Upload Movie</h1>

        {error && <p className="mb-4 rounded bg-red-600 p-3">{error}</p>}

        <input
          name="title"
          placeholder="Movie title"
          value={form.title}
          onChange={update}
          className="mb-4 w-full rounded bg-zinc-800 px-4 py-3 outline-none focus:ring-2 focus:ring-red-600"
          required
        />

        <input
          name="genre"
          placeholder="Genre"
          value={form.genre}
          onChange={update}
          className="mb-4 w-full rounded bg-zinc-800 px-4 py-3 outline-none focus:ring-2 focus:ring-red-600"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={update}
          className="mb-4 h-28 w-full rounded bg-zinc-800 px-4 py-3 outline-none focus:ring-2 focus:ring-red-600"
          required
        />

        <textarea
          name="summary"
          placeholder="Short summary"
          value={form.summary}
          onChange={update}
          className="mb-4 h-24 w-full rounded bg-zinc-800 px-4 py-3 outline-none focus:ring-2 focus:ring-red-600"
        />

        <input
          name="posterUrl"
          placeholder="Poster image URL"
          value={form.posterUrl}
          onChange={update}
          className="mb-4 w-full rounded bg-zinc-800 px-4 py-3 outline-none focus:ring-2 focus:ring-red-600"
        />

        <input
          type="file"
          accept="video/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="mb-6 w-full rounded bg-zinc-800 px-4 py-3"
          required
        />

        <button className="w-full rounded bg-red-600 py-3 font-bold hover:bg-red-700">
          Upload Movie
        </button>
      </form>
    </main>
  );
}