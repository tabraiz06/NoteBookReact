const mongoose=require('mongoose')

const mongoURI='mongodb://0.0.0.0:27017/iNotebook'
const connectMongo=()=>{
    mongoose.connect(mongoURI).then(()=>{
        console.log('connencted succesfully')
    }).catch((err)=>{
console.log(err)
    })
}

module.exports=connectMongo