import { useEffect, useState } from "react";
import api from "../lib/axios";
import NoteCard from "../components/NoteCard";
import { PlusIcon, Loader2Icon } from "lucide-react";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        setNotes(res.data);
      } catch (error) {
        console.error("Failed to fetch notes", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Loader2Icon className="size-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-base-content">My Notes</h1>
        <Link to="/create" className="btn btn-primary gap-2">
          <PlusIcon className="size-5" /> Add Note
        </Link>
      </div>

      {notes.length === 0 ? (
        <div className="text-center py-20 bg-base-100 rounded-xl border-2 border-dashed border-base-300">
          <p className="text-xl text-base-content/60">
            No notes found yet. Start by creating one!
          </p>
          <Link to="/create" className="btn btn-ghost mt-4 text-primary">
            Create your first note
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <NoteCard key={note._id} note={note} setNotes={setNotes} />
          ))}
        </div>
      )}
    </div>
  );
}
