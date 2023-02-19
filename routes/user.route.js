const express = require("express");
const {userModel} = require("../model/user")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const userRouter = express.Router()
userRouter.get("/", async(req,res)=>{
    res.send(await userModel.find())
})
userRouter.post("/register", async (req, res) => {
    const { name, email, pass, age } = req.body
    try {
        bcrypt.hash(pass, 5, async (err, hash) => {
            if (err) {
                res.send({ "mssg": "Something went Wrong", "error": err.message })
            } else {
                const user = new userModel({ name, age, email, pass: hash });
                await user.save()
                res.send({ "mssg": "User Registered" })
            }
        });
    } catch (error) {
        res.send({ "mssg": "Error while Registering", "error": error.message })
    }
})
userRouter.post("/login", async (req, res) => {
    const { email, pass } = req.body
    try {
        const user = await userModel.find({ email })
        if (user.length > 0) {
            bcrypt.compare(pass, user[0].pass, (err, result) => {
                if (result) {
                    const token = jwt.sign({ userID:user[0]._id }, 'masai');
                    res.send({ "mssg": "LogIn Successfull", "token": token })
                } else {
                    res.send({ "mssg": "Wrong Credentials"})
                }
            });
        } else {
            res.send({ "mssg": "Something went Wrong" })
        }

    } catch (error) {
        res.send({ "mssg": "Something went Wrong", "error": error.message })
    }
})
module.exports = {
    userRouter
}