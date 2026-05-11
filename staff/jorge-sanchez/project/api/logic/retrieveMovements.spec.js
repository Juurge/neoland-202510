import { expect } from "chai"

import { connect, disconnect } from "../mongoose/index.js"
import { UserModel } from "../mongoose/models/UserModel.js"
import { MovementModel } from "../mongoose/models/MovementModel.js"

import * as logic from "./index.js"

describe("retrieveMovements", () => {
  before(() => connect("mongodb://127.0.0.1:27017/test-myhousefinance"))

  beforeEach(() => {
    return Promise.all([
      UserModel.deleteMany(),
      MovementModel.deleteMany(),
    ])
  })

  it("succeeds returning only user movements", () => {
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

        return Promise.all([
          MovementModel.create({
            user: userId,
            name: "Rent",
            amount: 650,
            date: "2026-05-08",
            type: "expense",
            category: "Rent / Mortgage",
            frequency: "fixed",
          }),
          MovementModel.create({
            user: userId,
            name: "Salary",
            amount: 2000,
            date: "2026-05-08",
            type: "income",
            category: "Salary",
            frequency: "fixed",
          }),
          MovementModel.create({
            user: otherUserId,
            name: "Other rent",
            amount: 500,
            date: "2026-05-08",
            type: "expense",
            category: "Rent / Mortgage",
            frequency: "fixed",
          }),
        ])
      })
      .then(() => logic.retrieveMovements(userId))
      .then(movements => {
        expect(movements).to.have.lengthOf(2)
        expect(movements[0].user.toString()).to.equal(userId)
        expect(movements[1].user.toString()).to.equal(userId)
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