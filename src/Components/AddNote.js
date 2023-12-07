import React, { useContext } from 'react'
import { useState } from 'react'
import noteContext from '../Context/notes/NoteContext'


const AddNote = (props) => {
    const context = useContext(noteContext)
    const { addNote } = context
    const [note, setNote] = useState({
        title: '', description: "", tag: ''
    });

    const submitHandle = (e) => {
        e.preventDefault()
        addNote(note.title,note.description,note.tag)
        
        setNote({ title: '', description: "", tag: 'default'})
        props.showAlert('Note added succesfully', "success")
    }
    const onchange = (e) => {
        e.preventDefault()
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (

        <div className='container'>
            <h1>Add a Note</h1>
            <div className="container my-3" >
                <form>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label" name="title">Add Title</label>
                        <input placeholder='title must be atleast 5 cherectors' value={note.title} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="title" onChange={onchange} minLength={5} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label" name='description' >Description</label>
                        <input placeholder='discrioption must be atleast 5 cherectors' value={note.description} type="test" className="form-control" id="exampleInputPassword1" name='description' onChange={onchange} minLength={5} required/>
                    </div>

                    <button disabled={note.title.length<5 || note.description.length<5} onClick={submitHandle} type="submit" className="btn btn-primary">Add Note</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote
