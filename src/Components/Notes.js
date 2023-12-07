import React, { useContext, useEffect, useRef, useState } from 'react'

import noteContext from '../Context/notes/NoteContext'
import Noteitem from './Noteitem'
import AddNote from './AddNote'
import { useNavigate } from 'react-router-dom'


const Notes = (props) => {
    let history = useNavigate();

    const context = useContext(noteContext)
    const { notes, getNotes, editNote } = context
    useEffect(() => {
        if(localStorage.getItem('token')){
           getNotes() 
          
        }
        else{
            history('/login')
        }
        
    }, [])
    const ref = useRef(null)
    const refClose = useRef(null)
    const [note, setNote] = useState({
        etitle: '', edescription: "", etag: '', id: ''
    });

    const updateNote = (currentNote) => {
        ref.current.click()
       
        setNote({ etitle: currentNote.title, edescription: currentNote.description, id: currentNote._id })

    }

    const submitHandle = (e) => {
        e.preventDefault()
        console.log('note is updated', note)
        editNote(note.id, note.edescription, note.etitle)
        refClose.current.click()
 props.showAlert('Note updated succesfully', "success")

    }
    const onchange = (e) => {

        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (<>
        <AddNote showAlert={props.showAlert} />

        <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Launch demo modal
        </button>


        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="container my-3" >
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label" name="title">Edit Title</label>
                                    <input placeholder='title must be atleast 5 cherectors' value={note.etitle} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="etitle" onChange={onchange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label" name='description' >Edit Description</label>
                                    <input placeholder='description must be atleast 5 cherectors' value={note.edescription} type="test" className="form-control" id="exampleInputPassword1" name='edescription' onChange={onchange} minLength={5} required />
                                </div>


                            </form>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button disabled={note.etitle.length < 5 || note.edescription.length < 5} type="button" className="btn btn-primary" onClick={submitHandle}>Update Note</button>
                    </div>
                </div>
            </div>
        </div>
        <div className='row my-3'>
            <h2>Your Notes</h2>
            <div className="container">
                {notes.length === 0 && 'no notes to display'}
            </div>
            {notes.map((note) => {


                return (
                    <Noteitem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert}/>

                )
            })}
        </div>
    </>
    )
}

export default Notes
