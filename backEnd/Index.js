const  connectMongo=require("./db")
const express = require('express')
var cors = require('cors')
connectMongo()


var app = express() 
const port = 5000


app.use(cors())

app.use(express.json())
app.get('/', (req, res) => {
  res.send('Hello World!')
})


//available routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/Notes'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})






