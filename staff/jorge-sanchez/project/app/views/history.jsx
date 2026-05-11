import { useState } from "react"

function formatCurrency(amount) {
  return new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
  }).format(amount)
}

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-IE", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

function formatMonth(date) {
  return date.toLocaleDateString("en-IE", {
    month: "long",
    year: "numeric",
  })
}

function Badge({ frequency }) {
  const isFixed = frequency === "fixed"

  return (
    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
      isFixed ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
    }`}>
      {isFixed ? "Fixed" : "Variable"}
    </span>
  )
}

function MovementRow({ item, onClick }) {
  const isIncome = item.type === "income"

  return (
    <div
      onClick={onClick}
      className="flex cursor-pointer items-center justify-between rounded-xl bg-gray-50 p-3 transition hover:bg-gray-100"
    >
      <div className="flex items-center gap-3">
        <div className={`flex h-10 w-10 items-center justify-center rounded-full ${
          isIncome ? "bg-emerald-100" : "bg-red-100"
        }`}>
          <span>{item.icon}</span>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <p className="font-medium text-gray-800">{item.name}</p>
            <Badge frequency={item.frequency} />
          </div>

          <p className="text-xs text-gray-500">{formatDate(item.date)}</p>
        </div>
      </div>

      <span className={`font-bold ${isIncome ? "text-emerald-600" : "text-red-600"}`}>
        {isIncome ? "+" : "-"}
        {formatCurrency(item.amount)}
      </span>
    </div>
  )
}

export default function History({ movements, onBack, onGoToEditMovement }) {
  const [selectedMonth, setSelectedMonth] = useState(new Date())

  const selectedMonthNumber = selectedMonth.getMonth()
  const selectedYear = selectedMonth.getFullYear()

  const monthlyMovements = movements
    .filter(movement => {
      const movementDate = new Date(movement.date)

      return (
        movementDate.getMonth() === selectedMonthNumber &&
        movementDate.getFullYear() === selectedYear
      )
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date))

  const incomeMovements = monthlyMovements.filter(movement => movement.type === "income")
  const expenseMovements = monthlyMovements.filter(movement => movement.type === "expense")

  const totalIncome = incomeMovements.reduce((total, movement) => total + movement.amount, 0)
  const totalExpenses = expenseMovements.reduce((total, movement) => total + movement.amount, 0)
  const remainingBalance = totalIncome - totalExpenses

  const handlePreviousMonth = () => {
    setSelectedMonth(new Date(selectedYear, selectedMonthNumber - 1, 1))
  }

  const handleNextMonth = () => {
    setSelectedMonth(new Date(selectedYear, selectedMonthNumber + 1, 1))
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
              Monthly History
            </h2>
            <p className="text-sm text-gray-500">
              Review your income and expenses by month
            </p>
          </div>
        </header>

        <section className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-xl shadow-black/5">
          <button
            type="button"
            onClick={handlePreviousMonth}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100"
          >
            ‹
          </button>

          <span className="text-lg font-semibold text-gray-800">
            {formatMonth(selectedMonth)}
          </span>

          <button
            type="button"
            onClick={handleNextMonth}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100"
          >
            ›
          </button>
        </section>

        <section className="rounded-2xl bg-white p-5 shadow-xl shadow-black/5">
          <h2 className="mb-4 text-lg font-semibold text-gray-800">
            Monthly Summary
          </h2>

          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
                📈
              </div>
              <p className="mb-1 text-xs text-gray-500">Income</p>
              <p className="text-sm font-bold text-emerald-600">
                {formatCurrency(totalIncome)}
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                📉
              </div>
              <p className="mb-1 text-xs text-gray-500">Expenses</p>
              <p className="text-sm font-bold text-red-600">
                {formatCurrency(totalExpenses)}
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                💳
              </div>
              <p className="mb-1 text-xs text-gray-500">Remaining</p>
              <p className="text-sm font-bold text-blue-600">
                {formatCurrency(remainingBalance)}
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-2xl bg-white p-5 shadow-xl shadow-black/5">
          <h2 className="mb-4 text-lg font-semibold text-gray-800">
            Income
          </h2>

          <div className="space-y-3">
            {incomeMovements.map((movement) => (
              <MovementRow
                key={movement.id}
                item={movement}
                onClick={() => onGoToEditMovement(movement)}
              />
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
            <span className="text-sm text-gray-500">Income total</span>
            <span className="font-bold text-emerald-600">
              {formatCurrency(totalIncome)}
            </span>
          </div>
        </section>

        <section className="rounded-2xl bg-white p-5 shadow-xl shadow-black/5">
          <h2 className="mb-4 text-lg font-semibold text-gray-800">
            Expenses
          </h2>

          <div className="space-y-3">
            {expenseMovements.map((movement) => (
              <MovementRow
                key={movement.id}
                item={movement}
                onClick={() => onGoToEditMovement(movement)}
              />
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
            <span className="text-sm text-gray-500">Expenses total</span>
            <span className="font-bold text-red-600">
              {formatCurrency(totalExpenses)}
            </span>
          </div>
        </section>
      </div>
    </main>
  )
}