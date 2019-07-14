const express = require('express')
const app = express()
const port = process.env.PORT || 3000
require('dotenv').config()
app.use(express.json());
app.use(express.urlencoded({ extended:false }));

require('./app/controllers/index')(app)

app.listen(port,(e) => {
    if(e) console.log(e)
    console.log('server rodando na porta 3000')
})
