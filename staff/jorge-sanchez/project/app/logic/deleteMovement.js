export default function deleteMovement(movementId, token) {
  return fetch(`http://localhost:3000/movements/${movementId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}