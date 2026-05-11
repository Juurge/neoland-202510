export default function retrieveMovements(token) {
  return fetch("http://localhost:3000/movements", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(response => response.json())
}