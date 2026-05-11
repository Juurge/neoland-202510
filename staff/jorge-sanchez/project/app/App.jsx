import { useEffect, useState } from "react"
import Login from "./views/login"
import Dashboard from "./views/dashboard"
import History from "./views/history"
import AddMovement from "./views/addMovement"
import EditMovement from "./views/editMovement"

import { data } from "./data"

import retrieveMovements from "./logic/retrieveMovements"
import createMovement from "./logic/createMovement"
import updateMovement from "./logic/updateMovement"
import deleteMovement from "./logic/deleteMovement"

function getIcon(category, type) {
  if (type === "income") return "💼"

  switch (category) {
    case "Rent / Mortgage":
      return "🏠"
    case "Groceries":
      return "🛒"
    case "Bills":
      return "📶"
    case "Leisure":
      return "🎮"
    case "Salary":
      return "💰"
    default:
      return "💸"
  }
}

function formatMovement(movement) {
  return {
    id: movement._id,
    name: movement.name,
    amount: Number(movement.amount) || 0,
    date: movement.date,
    type: movement.type,
    category: movement.category,
    frequency: movement.frequency,
    icon: getIcon(movement.category, movement.type),
  }
}

function App() {
  const [user, setUser] = useState(() => data.getUser())

  const [view, setView] = useState(() => {
    return data.getUser() ? "dashboard" : "login"
  })

  const [movements, setMovements] = useState([])
  const [selectedMovement, setSelectedMovement] = useState(null)

  useEffect(() => {
    if (!user) return

    retrieveMovements(data.getToken())
      .then(movements => {
        setMovements(movements.map(formatMovement))
      })
  }, [user])

  const handleAddMovement = movement => {
    createMovement(movement, data.getToken())
      .then(createdMovement => {
        const createdMovements = Array.isArray(createdMovement)
          ? createdMovement
          : [createdMovement]

        setMovements(prev => [
          ...prev,
          ...createdMovements.map(formatMovement),
        ])

        setView("dashboard")
      })
  }

  const handleUpdateMovement = updatedMovement => {
    updateMovement(updatedMovement, data.getToken())
      .then(updated => {
        const formatted = formatMovement(updated)

        setMovements(prev =>
          prev.map(m => (m.id === formatted.id ? formatted : m))
        )

        setView("history")
      })
  }

  const handleDeleteMovement = movementId => {
    deleteMovement(movementId, data.getToken())
      .then(() => {
        setMovements(prev => prev.filter(m => m.id !== movementId))
        setView("history")
      })
  }

  const handleLogin = auth => {
    data.setToken(auth.token)
    data.setUser(auth.user)

    setUser(auth.user)
    setView("dashboard")
  }

  const handleLogout = () => {
    data.removeToken()
    data.removeUser()

    setUser(null)
    setMovements([])
    setSelectedMovement(null)
    setView("login")
  }

  const handleGoToEditMovement = movement => {
    setSelectedMovement(movement)
    setView("editMovement")
  }

  if (view === "dashboard") {
    return (
      <Dashboard
        user={user}
        movements={movements}
        onLogout={handleLogout}
        onGoToHistory={() => setView("history")}
        onGoToAddMovement={() => setView("addMovement")}
      />
    )
  }

  if (view === "history") {
    return (
      <History
        movements={movements}
        onBack={() => setView("dashboard")}
        onGoToEditMovement={handleGoToEditMovement}
      />
    )
  }

  if (view === "addMovement") {
    return (
      <AddMovement
        onBack={() => setView("dashboard")}
        onAddMovement={handleAddMovement}
      />
    )
  }

  if (view === "editMovement") {
    return (
      <EditMovement
        movement={selectedMovement}
        onBack={() => setView("history")}
        onUpdateMovement={handleUpdateMovement}
        onDeleteMovement={handleDeleteMovement}
      />
    )
  }

  return <Login onLogin={handleLogin} />
}

export default App