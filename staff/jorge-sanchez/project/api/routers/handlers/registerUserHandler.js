import { registerUser } from "../../logic/registerUser.js"

export const registerUserHandler = (req, res) => {
  const { name, email, password } = req.body

  registerUser(name, email, password)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(error => {
      if (error.message === "User already exists") {
        return res.status(409).json({ error: error.message })
      }

      if (
        error.name === "ValidationError" ||
        error.message.includes("invalid") ||
        error.message.includes("required")
      ) {
        return res.status(400).json({ error: error.message })
      }

      res.status(500).json({ error: error.message })
    })
}