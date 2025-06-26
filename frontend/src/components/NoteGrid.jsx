import NoteCard from './NoteCard'

const NoteGrid = ({notes,setNotes}) => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {notes.map((note) => {return <NoteCard key={note._id} note = {note} setNotes = {setNotes}/>})}
        </div>
    )
}

export default NoteGrid