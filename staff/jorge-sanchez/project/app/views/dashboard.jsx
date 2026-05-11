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

function SummaryCard({ title, amount, icon, iconBgClass, iconColorClass }) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-5 shadow-xl shadow-black/5">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-500">{title}</span>

        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconBgClass}`}>
          <span className={iconColorClass}>{icon}</span>
        </div>
      </div>

      <span className="text-2xl font-bold tracking-tight text-gray-900">
        {formatCurrency(amount)}
      </span>
    </div>
  )
}

function MovementItem({ movement }) {
  const isIncome = movement.type === "income"

  return (
    <div className="flex items-center gap-4 py-4">
      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${isIncome ? "bg-emerald-50" : "bg-slate-100"}`}>
        <span>{movement.icon}</span>
      </div>

      <div className="flex flex-1 flex-col gap-0.5">
        <span className="font-medium text-gray-900">{movement.name}</span>

        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span>{movement.category}</span>
          <span>•</span>
          <span>{formatDate(movement.date)}</span>
        </div>
      </div>

      <span className={`text-base font-semibold ${isIncome ? "text-emerald-600" : "text-red-500"}`}>
        {isIncome ? "+" : "-"}
        {formatCurrency(movement.amount)}
      </span>
    </div>
  )
}

export default function Dashboard({ user, movements, onLogout, onGoToHistory, onGoToAddMovement }) {
  const currentMonth = new Date()
  const currentMonthNumber = currentMonth.getMonth()
  const currentYear = currentMonth.getFullYear()

  const currentMonthMovements = movements.filter(movement => {
    const movementDate = new Date(movement.date)

    return (
      movementDate.getMonth() === currentMonthNumber &&
      movementDate.getFullYear() === currentYear
    )
  })

  const incomeMovements = currentMonthMovements.filter(movement => movement.type === "income")
  const expenseMovements = currentMonthMovements.filter(movement => movement.type === "expense")

  const monthlyIncome = incomeMovements.reduce((total, movement) => total + movement.amount, 0)
  const monthlyExpenses = expenseMovements.reduce((total, movement) => total + movement.amount, 0)
  const totalBalance = monthlyIncome - monthlyExpenses
  const savings = totalBalance

  const recentMovements = [...currentMonthMovements]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 4)

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 px-4 py-6 pb-24 sm:px-6 sm:py-8">
      <div className="mx-auto flex w-full max-w-lg flex-col gap-6">

        <header className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-3">

            <div className="flex items-center gap-3">
              <img src="/applogo.png" className="h-12 w-12 object-contain" />

              <div>
                <h1 className="text-2xl font-semibold tracking-tight">
                  <span className="text-gray-800">MyHouse</span>
                  <span className="text-emerald-600">Finance</span>
                </h1>
                <p className="text-xs text-gray-500">Personal home finances</p>
              </div>
            </div>

            <button
              type="button"
              onClick={onLogout}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
            >
              Log out
            </button>
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Welcome back, {user?.name} 👋
            </h2>

            <p className="text-sm text-gray-500">
              Monthly overview · {formatMonth(currentMonth)}
            </p>
          </div>
        </header>

        <section className="grid grid-cols-2 gap-3">
          <SummaryCard title="Total Balance" amount={totalBalance} icon="💳" iconBgClass="bg-emerald-50" iconColorClass="text-emerald-600" />
          <SummaryCard title="Monthly Income" amount={monthlyIncome} icon="📈" iconBgClass="bg-blue-50" iconColorClass="text-blue-600" />
          <SummaryCard title="Monthly Expenses" amount={monthlyExpenses} icon="📉" iconBgClass="bg-red-50" iconColorClass="text-red-500" />
          <SummaryCard title="Savings" amount={savings} icon="🐷" iconBgClass="bg-amber-50" iconColorClass="text-amber-600" />
        </section>

        <button
          type="button"
          onClick={onGoToAddMovement}
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition hover:bg-emerald-600"
        >
          + Add Movement
        </button>

        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Movements
            </h2>

            <button
              type="button"
              onClick={onGoToHistory}
              className="text-sm font-medium text-emerald-600 hover:text-emerald-700"
            >
              View History ›
            </button>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white px-5 shadow-xl shadow-black/5">
            <div className="divide-y divide-gray-100">
              {recentMovements.map((movement) => (
                <MovementItem
                  key={movement.id}
                  movement={movement}
                />
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}