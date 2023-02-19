const express = require("express");
const {noteModel} = require("../model/note.model")
const note = express.Router();
note.get("/",async(req,res)=>{
  const notes = await noteModel.find()
  res.send(notes)
})
note.get("/myNotes/:userIDs",async(req,res)=>{
 let userImp = req.params.userIDs
 const myNotes = await noteModel.find({userID:userImp})
 res.send(myNotes)
})
note.post("/create",async(req,res)=>{
try {
  const new_note = new noteModel(req.body)
  new_note.save()
  res.send({"mssg":"Successfully note created"})
} catch (error) {
  console.log(error)
}
})
note.patch("/update/:id",async(req,res)=>{
  let id = req.params.id
  const notes = await noteModel.findOne({"_id":id})
  const userID_in_note = notes.userID
  const userID_req = req.body.userID
try {
  if(userID_in_note!==userID_req){
    res.send({"mssg":"You are not authorized"})
  }else{
  await noteModel.findByIdAndUpdate({"_id":id},req.body)
  res.send("Updated the Note")
  }
} catch (error) {
  res.send({"mssg":"Something went wrong"})
}
})
note.delete("/delete/:id",async(req,res)=>{
  let id = req.params.id
  const notes = await noteModel.findOne({"_id":id})
  const userID_in_note = notes.userID
  const userID_req = req.body.userID
try {
  if(userID_in_note!==userID_req){
    res.send({"mssg":"You are not authorized"})
  }else{
  await noteModel.findByIdAndDelete({"_id":id})
  res.send("Deleted the Note")
  }
} catch (error) {
  res.send({"mssg":"Something went wrong"})
}
  })
module.exports={note}