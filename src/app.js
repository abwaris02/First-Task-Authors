const express = require("express");
const app = express()
require("./db/mongoose")
const Author = require("./models/author.js")

const port = process.env.PORT || 3000

app.use(express.json())

app.post('/authors', async (req, res) => {
    const author = new Author({
        name : req.body.name,
        email : req.body.email,
        phone : req.body.phone,
        age : req.body.age,
        dateOfBirth : req.body.dateOfBirth,
        address : req.body.address
    })
   try{
    const saveAuthors = await author.save()
    res.json(saveAuthors)
   }catch(err){
       res.json({message : err})
       console.log(err)
   }
});

app.get('/authors', async (req, res) => {
    try{
        const getAuthors = await Author.find({})
          res.json(getAuthors)
    }catch(err){
        res.json(err)
    }
});


app.get('/authors/:id', async (req, res) => {
    const _id = req.params.id

    try{
       const getAuthorsById = await Author.findById({_id})
         if(!getAuthorsById){
             res.status(404).json()
             return
         }
         res.json(getAuthorsById)
    }catch(err){
         res.json(err)
    }
});

app.patch('/authors/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdated = ["name", "age", "address"]
    isValidateOperation = updates.every((updates) => allowedUpdated.includes(updates))
       
    if(!isValidateOperation){
        return res.status(404).json({err : "Invalid update try another one"})
    }
    try{
       const updatesAuthors = await Author.findByIdAndUpdate(req.params.id, req.body,{
           new : true, 
           isValidator : true    
    })
       if(!updatesAuthors){
           res.status(404).json()
           return
       }
         res.json(updatesAuthors)
    }catch(err){
        res.json(err)
    }
});

app.delete('/authors/:id', async (req, res) => {
    try{
      const deleteAuthors = await Author.findByIdAndDelete(req.params.id)
           res.json(deleteAuthors)
    }catch(err){
        res.status(400).json(err)
    }
})



app.listen(port, () => {
    console.log(`Port listning up on port ${port}`)
})

