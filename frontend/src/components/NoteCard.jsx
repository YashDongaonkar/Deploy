import { Link } from 'react-router-dom'
import { PenSquareIcon, Trash2Icon } from "lucide-react"

import toast from 'react-hot-toast'

import api from '../lib/axios'
import { formatDate } from '../lib/utils'
import { getAuthHeader } from "../lib/utils.js"

const NoteCard = ({ note, setNotes }) => {

  const handleDelete = async (e, id) => {
    e.preventDefault()
    if (!window.confirm("Are you sure you want to delete this note?")) return
    try {
      await api.delete(`/api/notes/${id}`,{ headers: { Authorization: getAuthHeader() } })
      setNotes((prev) => prev.filter(note => note._id !== id))
      toast.success("Note deleted successfully")
    } catch (error) {
      console.log("Error in handleDelete", error)
      toast.error("Failed To delete note")
    }
  }

  return (
    <Link to={`/note/${note._id}`} className='card bg-base-100 hover:shadow-lg transition-all duration-200 border border-t-4 border-primary'>
      <div className="card-body">
        <h3 className='card-title text-base-content'>{note.title}</h3>
        <p className='text-base-content/70 line-clamp-3'>{note.content}</p>
        <div className="card-actions justify-between items-center mt-4">
          <span className='text-sm text-base-content/60'>{formatDate(new Date(note.createdAt))}</span>
          <div className="flex items-center gap-1">
            <PenSquareIcon className="size-5" />
            <Trash2Icon className='size-5' onClick={(e) => handleDelete(e, note._id)} />
          </div>
        </div>
      </div>
    </Link>
  )
}

export default NoteCard