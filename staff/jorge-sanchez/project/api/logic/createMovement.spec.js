import { expect } from "chai"

import { connect, disconnect } from "../mongoose/index.js"
import { UserModel } from "../mongoose/models/UserModel.js"
import { MovementModel } from "../mongoose/models/MovementModel.js"

import * as logic from "./index.js"

describe("createMovement", () => {
  before(() => connect("mongodb://127.0.0.1:27017/test-myhousefinance"))

  beforeEach(() => {
    return Promise.all([
      UserModel.deleteMany(),
      MovementModel.deleteMany(),
    ])
  })

  it("succeeds on valid data", () => {
    let userId

    return UserModel.create({
      name: "Jorge",
      email: "jorge@test.com",
      password: "123123123",
    })
      .then(user => {
        userId = user.id

        return logic.createMovement(
          userId,
          "Rent",
          650,
          "2026-05-08",
          "expense",
          "Rent / Mortgage",
          "fixed"
        )
      })
      .then(movement => {
        expect(movement.name).to.equal("Rent")
        expect(movement.amount).to.equal(650)
        expect(movement.type).to.equal("expense")
        expect(movement.category).to.equal("Rent / Mortgage")
        expect(movement.frequency).to.equal("fixed")
        expect(movement.user.toString()).to.equal(userId)
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