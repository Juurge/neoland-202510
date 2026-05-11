export default function createMovement(movement, token) {
  return fetch("http://localhost:3000/movements", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(movement),
  })
    .then(response => response.json())
}