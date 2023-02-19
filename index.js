const express = require("express");
const { connection } = require("./config/db")
const { userRouter } = require("./routes/user.route")
const { note } = require("./routes/note")
const {authenticate} = require("./middleware/auth")
const cors = require("cors")
require("dotenv").config()
const app = express();
app.use(express.json())
app.use(cors({
    origin:"https://faithful-gold-stockings.cyclic.app"
}))
app.get("/", (req, res) => {
    res.send("Home Page")
})
app.use("/users",userRouter)
app.use( authenticate)
app.use("/notes",note)
app.listen(process.env.port, async () => {
    try {
        await connection
        console.log("Connected to DB");
    } catch (error) {
        console.log(error);
    }
    console.log(`Server is running at port ${process.env.port}`);
})
