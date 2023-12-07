import React, { useContext } from 'react'
import noteContext from '../Context/notes/NoteContext'

const Noteitem = (props) => {
    const{note,updateNote}=props
    const context = useContext(noteContext)
    const {  deleteNote,editNote} = context
    return (
        <div className='col-md-4'>
             
               <div className="card" >
                <div className="container mt-3 " style={{display:'flex',justifyContent:'space-between'}}>
               <i className="fa-solid fa-file-pen mx-3" onClick={()=>{
               updateNote(note)
               props.showAlert('Notes deleted succussfully', 'success')
               }}></i> 
                    <i onClick={()=>{
                        deleteNote(note._id)
                        props.showAlert('Notes deleted succussfully', 'success')
                    }} className="fa-solid fa-trash-can mx-3"></i></div>
                 <div className="card-body">
                    <div className="flex align-item-center">
                      <h5 className="card-title">{note.title}</h5> 
                     
 
                    </div>
                    
                    <p className="card-text">{note.description} </p>
                   
                    
                </div>
            </div>
        </div>
    )
}

export default Noteitem
