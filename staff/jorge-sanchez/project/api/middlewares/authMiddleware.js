import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "myhousefinance-secret"

export const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization.slice(7)

    const { sub: userId } = jwt.verify(token, JWT_SECRET)

    req.userId = userId

    next()
  } catch (error) {
    next(error)
  }
}