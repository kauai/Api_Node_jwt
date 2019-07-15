const mongoose = require('../../database')
const bcrypt = require('bcryptjs')

// mongoose.set('useCreateIndex', true);
const ProjectSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    user:{
       type:mongoose.Schema.Types.ObjectId,
       ref:'User',
       require:true
    },
    tasks:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Task'
    }],
    createdAt:{
        type:Date,
        default:Date.now,
    }
}) 

// UserSchema.pre('save',async function(next){
//    const hash = await bcrypt.hash(this.password,10)
//    this.password = hash
//    next()
// })

const Projetct = mongoose.model('Project',ProjectSchema)

module.exports = Projetct