const express = require('express')
const router = express.Router()
const authMidlleware = require('../middlewares/auth')

const Project = require('../models/projects')
const Task = require('../models/task')

router.use(authMidlleware)

router.get('/', async (req,res) => {
   try {
      const projects = await Project.find().populate('user')
      return res.send({ projects  })
   } catch (error) {
      return res.status(400).send({error : 'Erro Loading projects'})
   }
})

router.get('/:projectid',async (req,res) => {
   try {
      const projects = await Project.findById(req.params.projectid).populate('user')
      return res.send({ projects  })
   } catch (error) {
      return res.status(400).send({error : 'Erro Loading projects'})
   }
})

router.post('/',async (req,res) => {
   try {
     const project = await Project.create({...req.body,user:req.userId})
     return res.send({ project })
   } catch (error) {
      return res.status(400).send({error : 'Erro creating new project'})
   }
})

router.put('/:projectid',async (req,res) => {
   res.send({ user: req.userId })
})

router.delete('/:projectid',async (req,res) => {
   try {
      await Project.findByIdAndRemove(req.params.projectid)
      return res.send({ message:"Project deleted" })
   } catch (error) {
      return res.status(400).send({error : 'Erro deleted projects'})
   }
})


module.exports = app => app.use('/project',router)