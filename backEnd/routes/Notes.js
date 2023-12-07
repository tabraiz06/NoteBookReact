const express = require('express')
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require("../models/AddedNotes")
const { body, validationResult } = require('express-validator');


//route 1: get all the notes using get "/api/notes/fetchallnotes"
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes)


    } catch (error) {
        console.error(error.message)
        res.status(500).send("some error occured")
    }
})



//route 2: add a new note using post "/api/notes/addnotes"
router.post('/addnotes', fetchuser, [

    body('title', 'enter a valid title').isLength({ min: 5 }),
    body('description', 'description  must be atleast 5 cherector ').isLength({ min: 5 }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
       

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save()

        res.json(savedNote)



    } catch (error) {
        console.error(error.message)
        res.status(500).send("some error occured in data")
    }
})
//route 3: update  a  note using put "/api/notes/updatenote"
router.put('/updatenote/:id', fetchuser,async (req, res) => {
const {title, description, tag}=req.body

try {
    

// create a new note object
const newNote={}
if(title){newNote.title=title}
if(description){newNote.description=description}
if(tag){newNote.tag=tag}

//find the note to be update and then update
let note= await Note.findById(req.params.id)
if(!note){return res.status(404).send('not found')}

if(note.user.toString() !== req.user.id){
    return res.status(401).send('not found')
}
note= await Note.findByIdAndUpdate(req.params.id, {$set:newNote},{ new:true})
res.json({note})
} catch (error) {
    console.error(error.message)
    res.status(500).send("some error occured in data")
}
})
//route 4: delte   a  note using delete "/api/notes/deltenote"
router.delete('/deletenote/:id', fetchuser,async (req, res) => {
const {title, description, tag}=req.body
try {
 //find the note to be update and then update
let note= await Note.findById(req.params.id)
if(!note){return res.status(404).send('not found')}

if(note.user.toString() !== req.user.id){
    return res.status(401).send('not found')
}
note= await Note.findOneAndDelete(req.params.id)
res.json({"Success":"note has been deleted successfully",note:note})   
}

catch(error){
    console.error(error.message)
    res.status(500).send("some error occured in data")
}

})

module.exports = router