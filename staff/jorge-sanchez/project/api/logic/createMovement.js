import { validate } from "com"
import { MovementModel } from "../mongoose/models/MovementModel.js"

function addMonths(date, months) {
  const newDate = new Date(`${date}T00:00:00`)

  const originalDay = newDate.getDate()

  newDate.setMonth(newDate.getMonth() + months)

  if (newDate.getDate() !== originalDay) {
    newDate.setDate(0)
  }

  return newDate.toISOString().slice(0, 10)
}

export function createMovement(userId, name, amount, date, type, category, frequency) {
  validate.id(userId, "user id")
  validate.name(name)
  validate.number(amount, "amount")
  validate.date(date)

  if (frequency === "fixed") {
    const movements = []

    for (let i = 0; i < 12; i++) {
      movements.push({
        user: userId,
        name,
        amount,
        date: addMonths(date, i),
        type,
        category,
        frequency,
      })
    }

    return MovementModel.create(movements)
  }

  return MovementModel.create({
    user: userId,
    name,
    amount,
    date,
    type,
    category,
    frequency,
  })
}