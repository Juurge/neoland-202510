import mongoose from "mongoose"
import movementSchema from "../schemas/movementSchema.js"

export const MovementModel = mongoose.model("Movement", movementSchema)