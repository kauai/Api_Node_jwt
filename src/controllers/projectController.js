const express = require('express')
const router = express.Router()
const authMidlleware = require('../middlewares/auth')

router.use(authMidlleware)

router.get('/', async (req,res) => {
   res.send({ ok:true, user:req.userId })
})

module.exports = app => app.use('/project',router)