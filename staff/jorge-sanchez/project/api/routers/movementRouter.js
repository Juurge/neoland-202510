import { Router } from "express"

import { authMiddleware } from "../middlewares/index.js"

import { retrieveMovements } from "../logic/retrieveMovements.js"
import { createMovement } from "../logic/createMovement.js"
import { updateMovement } from "../logic/updateMovement.js"
import { deleteMovement } from "../logic/deleteMovement.js"

export const movementRouter = Router()

movementRouter.get("/", authMiddleware, (req, res, next) => {
  try {
    const { userId } = req

    retrieveMovements(userId)
      .then(movements => {
        res.json(movements)
      })
      .catch(error => next(error))
  } catch (error) {
    next(error)
  }
})

movementRouter.post("/", authMiddleware, (req, res, next) => {
  try {
    const { userId } = req
    const { name, amount, date, type, category, frequency } = req.body

    createMovement(userId, name, amount, date, type, category, frequency)
      .then(movement => {
        res.status(201).json(movement)
      })
      .catch(error => next(error))
  } catch (error) {
    next(error)
  }
})

movementRouter.put("/:movementId", authMiddleware, (req, res, next) => {
  try {
    const { userId } = req
    const { movementId } = req.params

    const { name, amount, date, type, category, frequency } = req.body

    updateMovement(
      userId,
      movementId,
      name,
      amount,
      date,
      type,
      category,
      frequency
    )
      .then(updatedMovement => {
        res.json(updatedMovement)
      })
      .catch(error => next(error))
  } catch (error) {
    next(error)
  }
})

movementRouter.delete("/:movementId", authMiddleware, (req, res, next) => {
  try {
    const { userId } = req
    const { movementId } = req.params

    deleteMovement(userId, movementId)
      .then(() => {
        res.status(204).send()
      })
      .catch(error => next(error))
  } catch (error) {
    next(error)
  }
})