import { FileX2Icon } from "lucide-react"
import { Link } from 'react-router-dom'

const NotesNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center py-20">
      <FileX2Icon className="w-12 h-12 text-gray-500 mb-4" />
      <h2 className="text-xl font-semibold mb-2">No Notes Found</h2>
      <p className="text-gray-500 mb-4">You haven’t created any notes yet.</p>
      <Link to="/create" className='btn btn-primary'>Create One Now</Link>
    </div>
  )
}

export default NotesNotFound