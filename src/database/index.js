const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb://localhost/noderest',{
     useCreateIndex: true,//sem essa config da erro
     useNewUrlParser:true
})

mongoose.Promise = global.Promise

module.exports = mongoose