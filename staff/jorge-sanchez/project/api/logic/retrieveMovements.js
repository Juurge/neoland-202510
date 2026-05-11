import { validate } from "com"
import { MovementModel } from "../mongoose/models/MovementModel.js"

export function retrieveMovements(userId) {
  validate.id(userId, "user id")

  return MovementModel.find({ user: userId })
}