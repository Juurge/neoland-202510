import { useState } from "react"

const categories = [
  "Salary",
  "Rent / Mortgage",
  "Bills",
  "Groceries",
  "Leisure",
  "Other",
]

function formatDateForInput(date) {
  if (!date) return ""

  return new Date(date).toISOString().slice(0, 10)
}

export default function EditMovement({ movement, onBack, onUpdateMovement, onDeleteMovement }) {
  const [name, setName] = useState(movement?.name || "")
  const [amount, setAmount] = useState(String(movement?.amount || ""))
  const [date, setDate] = useState(formatDateForInput(movement?.date))
  const [movementType, setMovementType] = useState(movement?.type || "expense")
  const [category, setCategory] = useState(movement?.category || "")
  const [frequency, setFrequency] = useState(movement?.frequency || "one-time")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleSubmit = event => {
    event.preventDefault()
    setError("")
    setSuccess("")

    if (!name.trim()) {
      setError("Name is required")
      return
    }

    if (!amount || Number(amount) <= 0) {
      setError("Amount must be greater than 0")
      return
    }

    if (!date) {
      setError("Date is required")
      return
    }

    if (!category) {
      setError("Category is required")
      return
    }

    const updatedMovement = {
      ...movement,
      name,
      amount: Number(amount),
      date,
      type: movementType,
      category,
      frequency,
    }

    onUpdateMovement(updatedMovement)
  }

  const handleDelete = () => {
    setError("")
    setSuccess("")

    if (confirm("Are you sure you want to delete this movement?")) {
      onDeleteMovement(movement.id)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 px-4 py-6 pb-24">
      <div className="mx-auto flex w-full max-w-lg flex-col gap-6">

        <header className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBack}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm transition hover:shadow-md"
            >
              ←
            </button>

            <div className="flex items-center gap-3">
              <img src="/applogo.png" className="h-10 w-10 object-contain" />

              <h1 className="text-2xl font-semibold tracking-tight">
                <span className="text-gray-800">MyHouse</span>
                <span className="text-emerald-600">Finance</span>
              </h1>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Edit Movement
            </h2>
            <p className="text-sm text-gray-500">
              Update or delete this movement
            </p>
          </div>
        </header>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 rounded-2xl border border-gray-100 bg-white p-5 shadow-xl shadow-black/5"
        >
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Name
            </label>

            <input
              type="text"
              value={name}
              onChange={event => setName(event.target.value)}
              placeholder="e.g. Rent, Groceries, Dinner"
              className="w-full rounded-xl border border-gray-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Amount
            </label>

            <input
              type="number"
              min="0"
              step="0.01"
              value={amount}
              onChange={event => setAmount(event.target.value)}
              placeholder="0.00"
              className="w-full rounded-xl border border-gray-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Date
            </label>

            <input
              type="date"
              value={date}
              onChange={event => setDate(event.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Movement Type
            </label>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setMovementType("income")}
                className={`rounded-xl py-3 font-medium transition ${
                  movementType === "income"
                    ? "bg-emerald-500 text-white"
                    : "border border-gray-200 bg-slate-50 text-gray-600"
                }`}
              >
                Income
              </button>

              <button
                type="button"
                onClick={() => setMovementType("expense")}
                className={`rounded-xl py-3 font-medium transition ${
                  movementType === "expense"
                    ? "bg-red-500 text-white"
                    : "border border-gray-200 bg-slate-50 text-gray-600"
                }`}
              >
                Expense
              </button>
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Category
            </label>

            <select
              value={category}
              onChange={event => setCategory(event.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-500"
            >
              <option value="">Select a category</option>

              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Frequency
            </label>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFrequency("one-time")}
                className={`rounded-xl py-3 font-medium transition ${
                  frequency === "one-time"
                    ? "bg-gray-800 text-white"
                    : "border border-gray-200 bg-slate-50 text-gray-600"
                }`}
              >
                One-time
              </button>

              <button
                type="button"
                onClick={() => setFrequency("fixed")}
                className={`rounded-xl py-3 font-medium transition ${
                  frequency === "fixed"
                    ? "bg-emerald-600 text-white"
                    : "border border-gray-200 bg-slate-50 text-gray-600"
                }`}
              >
                Fixed Monthly
              </button>
            </div>
          </div>

          {frequency === "fixed" && (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">
              This movement will repeat every month automatically.
            </div>
          )}

          {error && (
            <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </p>
          )}

          {success && (
            <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              {success}
            </p>
          )}

          <div className="flex flex-col gap-3 pt-2">
            <button
              type="submit"
              className="w-full rounded-xl bg-emerald-500 py-3 font-semibold text-white shadow-lg shadow-emerald-500/25 transition hover:bg-emerald-600"
            >
              Save Changes
            </button>

            <button
              type="button"
              onClick={handleDelete}
              className="w-full rounded-xl border border-red-200 bg-red-50 py-3 font-semibold text-red-600 transition hover:bg-red-100"
            >
              Delete Movement
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}