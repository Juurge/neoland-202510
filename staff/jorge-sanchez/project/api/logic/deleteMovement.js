import {
  validate,
  ExistenceError,
  OwnershipError,
} from "com"

import { MovementModel } from "../mongoose/models/MovementModel.js"

export function deleteMovement(userId, movementId) {
  validate.id(userId, "user id")
  validate.id(movementId, "movement id")

  return MovementModel.findById(movementId)
    .then(movement => {
      if (!movement) {
        throw new ExistenceError("movement not found")
      }

      if (movement.user.toString() !== userId) {
        throw new OwnershipError("movement does not belong to user")
      }

      return MovementModel.findByIdAndDelete(movementId)
    })
}