import mongoose from "mongoose"

export * from "mongoose"
export * from "./models/index.js"

export function connect(url) {
  return mongoose.connect(url)
}