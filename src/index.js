const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.use(express.json());
app.use(express.urlencoded({ extended:false }));

app.get('/',(req,res) => {
    res.send('<h1>Sevidor rodando</h1>')
})


app.listen(port,(e) => {
    if(e) console.log(e)
    console.log('server rodando na porta 3000')
})
