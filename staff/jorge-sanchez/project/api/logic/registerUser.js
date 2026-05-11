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

export function registerUser(name, email, password) {
  validate.name(name)
  validate.email(email)
  validate.password(password)

  return UserModel.findOne({ email })
    .then(existingUser => {
      if (existingUser) {
        throw new Error("User already exists")
      }

      return bcrypt.hash(password, 10)
    })
    .then(hashedPassword => {
      return UserModel.create({
        name,
        email,
        password: hashedPassword,
      })
    })
    .then(user => formatUser(user))
}