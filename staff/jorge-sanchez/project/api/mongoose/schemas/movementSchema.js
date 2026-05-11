import mongoose from "mongoose"

const movementSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true
  },

  name: {
    type: String,
    required: true
  },

  amount: {
    type: Number,
    required: true
  },

  date: {
    type: Date,
    required: true
  },

  type: {
    type: String, // "income" | "expense"
    required: true
  },

  category: {
    type: String,
    required: true
  },

  frequency: {
    type: String, // "fixed" | "one-time"
    required: true
  }
})

export default movementSchema