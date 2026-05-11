import { expect } from "chai"

import { connect, disconnect } from "../mongoose/index.js"
import { UserModel } from "../mongoose/models/UserModel.js"
import { MovementModel } from "../mongoose/models/MovementModel.js"

import * as logic from "./index.js"

import { ExistenceError, OwnershipError } from "com"

describe("deleteMovement", () => {
  before(() => connect("mongodb://127.0.0.1:27017/test-myhousefinance"))

  beforeEach(() => {
    return Promise.all([
      UserModel.deleteMany(),
      MovementModel.deleteMany(),
    ])
  })

  it("succeeds on own movement", () => {
    let userId
    let movementId

    return UserModel.create({
      name: "Jorge",
      email: "jorge@test.com",
      password: "123123123",
    })
      .then(user => {
        userId = user.id

        return MovementModel.create({
          user: userId,
          name: "Rent",
          amount: 650,
          date: "2026-05-08",
          type: "expense",
          category: "Rent / Mortgage",
          frequency: "fixed",
        })
      })
      .then(movement => {
        movementId = movement.id

        return logic.deleteMovement(userId, movementId)
      })
      .then(() => {
        return MovementModel.findById(movementId)
      })
      .then(movement => {
        expect(movement).to.be.null
      })
  })

  it("fails on non-existing movement", () => {
    let caughtError

    return UserModel.create({
      name: "Jorge",
      email: "jorge@test.com",
      password: "123123123",
    })
      .then(user => {
        return logic.deleteMovement(
          user.id,
          "012345678901234567890123"
        )
      })
      .catch(error => {
        caughtError = error
      })
      .finally(() => {
        expect(caughtError).to.be.instanceOf(ExistenceError)
        expect(caughtError.message).to.equal("movement not found")
      })
  })

  it("fails on other user movement", () => {
    let caughtError
    let userId
    let otherUserId

    return UserModel.create({
      name: "Jorge",
      email: "jorge@test.com",
      password: "123123123",
    })
      .then(user => {
        userId = user.id

        return UserModel.create({
          name: "Other",
          email: "other@test.com",
          password: "123123123",
        })
      })
      .then(otherUser => {
        otherUserId = otherUser.id

        return MovementModel.create({
          user: otherUserId,
          name: "Other rent",
          amount: 500,
          date: "2026-05-08",
          type: "expense",
          category: "Rent / Mortgage",
          frequency: "fixed",
        })
      })
      .then(movement => {
        return logic.deleteMovement(userId, movement.id)
      })
      .catch(error => {
        caughtError = error
      })
      .finally(() => {
        expect(caughtError).to.be.instanceOf(OwnershipError)
        expect(caughtError.message).to.equal("movement does not belong to user")
      })
  })

  afterEach(() => {
    return Promise.all([
      UserModel.deleteMany(),
      MovementModel.deleteMany(),
    ])
  })

  after(() => disconnect())
})