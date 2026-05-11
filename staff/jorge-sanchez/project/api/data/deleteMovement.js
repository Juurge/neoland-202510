import { SystemError } from 'com'
import { MovementModel } from '../mongoose/index.js'

export function deleteMovement(movementId) {
    return MovementModel.findByIdAndDelete(movementId)
        .catch(error => { throw new SystemError(error.message) })
        .then(movementModel => { })
}