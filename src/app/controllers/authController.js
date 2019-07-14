const express = require('express')
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const authConfig = require('../../config/auth')
const mailer = require('../../modules/mailer')
const router = express.Router()

function generateToken(params = {}){
  return jwt.sign(params,authConfig.secret,{
    expiresIn:86400
 })
}

router.post('/register',async (req,res) => {
  const { email } = req.body
   try {
     if(await User.findOne({ email }))
     return res.status(400)
     .send({error:'User already exists'})
  
     const user = await User.create(req.body)
     user.password = undefined

     return res.send({ user,token: generateToken({ id: user.id }) })
   } catch (e) {
       return res.status(400).send({error:e})
       console.log(e)
   }
})

router.post('/authenticate',async (req,res) => {
   const { email, password } = req.body
   const user = await User.findOne({ email }).select('+password')
   if(!user)
   return res.status(400).send({ error: 'User not found'});

   if(!await bcrypt.compare(password, user.password))
     return res.status(400).send({error: 'Invalid password'})
   user.password = undefined
  
 

   res.send({ user, token: generateToken({ id: user.id }) })

})

router.post('/forgot_password',async (req,res) => {
   const { email } = req.body

   try {
     const user = await User.findOne({ email })
     if(!user)
     return res.status(400).send({ error: 'User not found'});
     const token = crypto.randomBytes(20).toString('hex')
     const now = new Date()
     now.setHours(now.getHours() + 1)
     console.log('TOKEN',token)
     await User.findByIdAndUpdate(user.id,{
       '$set':{
         'passwordResetToken':token,
         'passwordResetExpires':now
       }
     })


   const emailSend = {
        from: 'thiago_kauai@hotmail.com',
        to: email,
        template:'auth/forgot_password',
        context:{ token }
    };

     mailer.sendMail(emailSend, function(err, info){
        if (err ){
          console.log(err);
        }
        else {
          console.log('Message sent: ' + info.response);
        }
     });



   } catch (error) {
     res.status(400).send({error: 'Failed '+ error})
   }
})

router.post('/reset_password',async (req,res) => {
  const { email, token ,password } = req.body
  try {
    const user = await User.findOne({ email })
    .select('+passwordResetToken passwordResetExpires')
    if(!user)
    return res.status(400).send({ error: 'User not found'});

    if(token !== user.passwordResetToken)
    return res.status(400).send({ error: 'Token invalid'});

    const now = new Date()
    if(now > user.passwordResetExpires)
    return res.status(400).send({ error: 'Token expired,generate a new run'});

    user.password = password
      await user.save()
      res.send({ ok: true })
  } catch (error) {
      res.status(400).send({error: 'Cannot reset password try again'})
  }
})

module.exports = app => app.use('/auth',router)