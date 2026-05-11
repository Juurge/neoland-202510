import { SystemError } from 'com'
import { MovementModel } from '../mongoose/index.js'

export function updateMovement(movementData) {
    const { id, name, amount, date, type, category, frequency } = movementData

    return MovementModel.findByIdAndUpdate(id, {
        name,
        amount,
        date,
        type,
        category,
        frequency
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(movementModel => { })
}