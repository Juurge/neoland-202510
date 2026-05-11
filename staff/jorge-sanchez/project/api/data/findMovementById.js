import { SystemError } from 'com'
import { MovementModel } from '../mongoose/index.js'
import { MovementData } from './models/index.js'

export function findMovementById(movementId) {
    return MovementModel.findById(movementId)
        .catch(error => { throw new SystemError(error.message) })
        .then(movementModel => {
            if (!movementModel)
                throw new SystemError('movement not found')

            const { id, user, name, amount, date, type, category, frequency } = movementModel

            return new MovementData(
                id,
                user.toString(),
                name,
                amount,
                date,
                type,
                category,
                frequency
            )
        })
}