import bcrypt from "bcryptjs"
import { validate } from "com"
import { UserModel } from "../mongoose/models/UserModel.js"

function formatUser(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
  }
}

export function authenticateUser(email, password) {
  validate.email(email)
  validate.password(password)

  return UserModel.findOne({ email })
    .then(user => {
      if (!user) {
        throw new Error("Invalid credentials")
      }

      return bcrypt.compare(password, user.password)
        .then(match => {
          if (!match) {
            throw new Error("Invalid credentials")
          }

          return formatUser(user)
        })
    })
}