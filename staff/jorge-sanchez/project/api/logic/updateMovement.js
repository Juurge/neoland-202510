import {
  validate,
  ExistenceError,
  OwnershipError,
} from "com"

import { MovementModel } from "../mongoose/models/MovementModel.js"

export function updateMovement(
  userId,
  movementId,
  name,
  amount,
  date,
  type,
  category,
  frequency
) {
  validate.id(userId, "user id")
  validate.id(movementId, "movement id")
  validate.name(name)
  validate.number(amount, "amount")
  validate.date(date)

  return MovementModel.findById(movementId)
    .then(movement => {
      if (!movement) {
        throw new ExistenceError("movement not found")
      }

      if (movement.user.toString() !== userId) {
        throw new OwnershipError("movement does not belong to user")
      }

      return MovementModel.findByIdAndUpdate(
        movementId,
        {
          $set: {
            name,
            amount,
            date,
            type,
            category,
            frequency,
          },
        },
        { returnDocument: "after" }
      )
    })
}