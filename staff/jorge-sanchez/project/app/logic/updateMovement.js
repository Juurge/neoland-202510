export default function updateMovement(movement, token) {
  return fetch(`http://localhost:3000/movements/${movement.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: movement.name,
      amount: movement.amount,
      date: movement.date,
      type: movement.type,
      category: movement.category,
      frequency: movement.frequency,
    }),
  })
    .then(response => response.json())
}