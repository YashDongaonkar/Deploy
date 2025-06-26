import { useEffect, useState } from 'react'
import toast from "react-hot-toast"

import Header from "../components/Header.jsx"
import NotesNotFound from "../components/NotesNotFound.jsx"
import NoteGrid from "../components/NoteGrid.jsx"

import api from "../lib/axios.js"
import {getAuthHeader} from "../lib/utils.js"

const HomePage = () => {

    const [notes, setNotes] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchNotes = async () => {
            setLoading(true)
            try {
                const response = await api.get("/api/notes", {headers: { Authorization: getAuthHeader() }})
                setNotes(response.data)
            } catch (error) {
                console.log(error)
                toast.error("Failed to load notes")
            } finally {
                setLoading(false)
            }
        }

        fetchNotes()
    }, [])

    return (
        <div className="min-h-screen">
            <Header />
            <div className='max-w-7xl mx-auto p-4 mt-6'>
                {loading && <div className='text-center text-primary py-10'>Loading Notes...</div>}

                {notes.length ? <NoteGrid notes = {notes} setNotes = {setNotes}/> : <NotesNotFound />}
            </div>
        </div>

    )
}

export default HomePage