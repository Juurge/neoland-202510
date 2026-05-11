import express from "express"
import cors from "cors"
import { connect } from "./mongoose/index.js"
import { movementRouter, userRouter } from "./routers/index.js"
import { errorHandler } from "./middlewares/index.js"

const PORT = 3000

connect("mongodb://127.0.0.1:27017/myhousefinance")
  .then(() => {
    console.log("DB connected")

    const api = express()

    api.use(cors())
    api.use(express.json())

    api.get("/", (req, res) => {
      res.json({ message: "API running 🚀" })
    })

    api.use("/movements", movementRouter)
    api.use("/users", userRouter)

    api.use(errorHandler)

    api.listen(PORT, () => {
      console.log(`API listening on port ${PORT}`)
    })
  })
  .catch(error => console.error(error))