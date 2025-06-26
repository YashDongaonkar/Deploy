import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ArrowLeftIcon, Trash2Icon } from 'lucide-react';

import Loader from '../components/Loader';

import api from '../lib/axios';
import { getAuthHeader } from "../lib/utils.js"

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      await api.delete(`/api/notes/${id}`, { headers: { Authorization: getAuthHeader() } });
      toast.success("Note deleted successfully");
      navigate("/home");
    } catch (error) {
      console.error("Error deleting the note", error);
      toast.error("Failed To delete note");
    }
  };

  const handleSave = async () => {
    const trimmedTitle = note.title.trim();
    const trimmedContent = note.content.trim();

    if (!trimmedTitle || !trimmedContent) {
      toast.error("Please add title / content");
      return;
    }

    setSaving(true);

    try {
      await api.put(`/api/notes/${id}`, { title: trimmedTitle, content: trimmedContent }, { headers: { Authorization: getAuthHeader() } });
      toast.success("Note updated successfully");
      navigate("/home");
    } catch (error) {
      console.error("Error updating the note", error);
      toast.error("Failed To update note");
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    const fetchNote = async () => {
      try {
        const response = await api.get(`/api/notes/${id}`, { headers: { Authorization: getAuthHeader() } });
        setNote(response.data);
      } catch (error) {
        console.error("Error in fetching the note", error);
        toast.error("Failed to fetch the note");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to="/home" className="btn btn-ghost">
              <ArrowLeftIcon className="h-5 w-5" />
              Back to Notes
            </Link>
            <button onClick={handleDelete} className="btn btn-error btn-outline" disabled={saving || loading}>
              <Trash2Icon className="h-5 w-5" />
              Delete Note
            </button>
          </div>

          <div className="card bg-base-100">
            <div className="card-body">
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Note title"
                  className="input input-bordered"
                  value={note?.title || ''}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                  disabled={saving || loading}
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className='label-text'>Content</span>
                </label>
                <textarea
                  placeholder="Note Content"
                  className='textarea textarea-bordered'
                  value={note?.content || ''}
                  onChange={(e) => setNote({ ...note, content: e.target.value })}
                  disabled={saving || loading}
                />
              </div>

              <div className="card-actions justify-end">
                <button className="btn btn-primary" disabled={saving || loading} onClick={handleSave}>
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;
