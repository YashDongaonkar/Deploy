import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ArrowLeftIcon } from "lucide-react"
import toast from 'react-hot-toast'

import api from '../lib/axios'
import { getAuthHeader } from "../lib/utils.js"

const CreatePage = () => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const titleTrimmed = title.trim()
    const contentTrimmed = content.trim()

    if (!titleTrimmed || !contentTrimmed) {
      toast.error("All fields are required")
      return;
    }

    setLoading(true)
    try {
      await api.post(`/api/notes`, {
        title: titleTrimmed,
        content: contentTrimmed
      }, { headers: { Authorization: getAuthHeader() } })
      toast.success("Note created successfully")
      setTitle("")
      setContent("")
      navigate("/home")
    } catch (error) {
      console.log("Error creating note", error)
      toast.error("Failed to create note")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-base-200'>
      <div className="container mx-auto px-4 py-8">
        <Link to={"/home"} className="btn btn-ghost mb-6">
          <ArrowLeftIcon className='size-5' />
          Back To Notes
        </Link>


        <div className="card bg-base-100">
          <div className="card-body">
            <h2 className='card-title text-2xl mb-4'>Create New Note</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-control mb-4">
                <label className="label">
                  <span className='label-text'>Title</span>
                </label>
                <input type="text"
                  placeholder="Note Title"
                  className='input input-bordered'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)} />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className='label-text'>Content</span>
                </label>
                <textarea type="text"
                  placeholder="Note Content"
                  className='textarea textarea-bordered'
                  value={content}
                  onChange={(e) => setContent(e.target.value)} />
              </div>

              <div className="card-actions justify-end">
                <button type="submit" className='btn btn-primary' disabled={loading}>
                  {loading ? "Creating..." : "Create Note"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

    </div>
  )
}

export default CreatePage