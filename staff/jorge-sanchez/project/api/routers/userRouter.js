import { Router } from "express"

import { UserModel } from "../mongoose/models/UserModel.js"

import {
  registerUserHandler,
  authenticateUserHandler,
} from "./handlers/index.js"

export const userRouter = new Router()

userRouter.get("/", (req, res) => {
  UserModel.find()
    .then(users => res.json(users))
    .catch(error => res.status(500).json({ error: error.message }))
})

userRouter.post("/", registerUserHandler)

userRouter.post("/auth", authenticateUserHandler)