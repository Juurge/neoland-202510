import bcrypt from "bcryptjs"
import { expect } from "chai"

import { connect, disconnect } from "../mongoose/index.js"
import { UserModel } from "../mongoose/models/UserModel.js"

import * as logic from "./index.js"

describe("registerUser", () => {
  before(() => connect("mongodb://127.0.0.1:27017/test-myhousefinance"))

  beforeEach(() => {
    return UserModel.deleteMany()
  })

  it("succeeds on new user", () => {
    return logic.registerUser("Jorge", "jorge@test.com", "123123123")
      .then(user => {
        expect(user.name).to.equal("Jorge")
        expect(user.email).to.equal("jorge@test.com")
        expect(user.id).to.exist

        return UserModel.findOne({ email: "jorge@test.com" })
      })
      .then(user => {
        expect(user).to.exist
        expect(user.name).to.equal("Jorge")
        expect(user.email).to.equal("jorge@test.com")
        expect(user.password).to.not.equal("123123123")

        return bcrypt.compare("123123123", user.password)
      })
      .then(match => {
        expect(match).to.equal(true)
      })
  })

  it("fails on existing user", () => {
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
        return logic.registerUser("Jorge", "jorge@test.com", "123123123")
      })
      .catch(error => {
        caughtError = error
      })
      .finally(() => {
        expect(caughtError).to.exist
        expect(caughtError.message).to.equal("User already exists")
      })
  })

  afterEach(() => {
    return UserModel.deleteMany()
  })

  after(() => disconnect())
})