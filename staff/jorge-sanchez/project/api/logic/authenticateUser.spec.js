import bcrypt from "bcryptjs"
import { expect } from "chai"

import { connect, disconnect } from "../mongoose/index.js"
import { UserModel } from "../mongoose/models/UserModel.js"

import * as logic from "./index.js"

describe("authenticateUser", () => {

  before(() => connect("mongodb://127.0.0.1:27017/test-myhousefinance"))

  beforeEach(() => {
    return UserModel.deleteMany()
  })

  it("succeeds on correct credentials", () => {
    let hashedPassword

    return bcrypt.hash("123123123", 10)
      .then(hash => {
        hashedPassword = hash

        return UserModel.create({
          name: "Jorge",
          email: "jorge@test.com",
          password: hashedPassword,
        })
      })
      .then(() => {
        return logic.authenticateUser(
          "jorge@test.com",
          "123123123"
        )
      })
      .then(user => {
        expect(user.name).to.equal("Jorge")
        expect(user.email).to.equal("jorge@test.com")
      })
  })

  it("fails on wrong password", () => {
    let caughtError

    return bcrypt.hash("123123123", 10)
      .then(hash => {
        return UserModel.create({
          name: "Jorge",
          email: "jorge@test.com",
          password: hash,
        })
      })
      .then(() => {
        return logic.authenticateUser(
          "jorge@test.com",
          "wrongpassword"
        )
      })
      .catch(error => {
        caughtError = error
      })
      .finally(() => {
        expect(caughtError).to.exist
        expect(caughtError.message).to.equal("Invalid credentials")
      })
  })

  afterEach(() => {
    return UserModel.deleteMany()
  })

  after(() => disconnect())
})