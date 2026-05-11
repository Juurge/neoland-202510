import jwt from "jsonwebtoken"

import { authenticateUser } from "../../logic/authenticateUser.js"

const JWT_SECRET = process.env.JWT_SECRET || "myhousefinance-secret"

export const authenticateUserHandler = (req, res, next) => {
  try {
    const { email, password } = req.body

    authenticateUser(email, password)
      .then(user => {
        const token = jwt.sign(
          { sub: user.id },
          JWT_SECRET,
          { expiresIn: "1h" }
        )

        res.json({
          token,
          user,
        })
      })
      .catch(error => next(error))
  } catch (error) {
    next(error)
  }
}