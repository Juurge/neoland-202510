import { useState } from "react"
import AuthForm from "./components/AuthForm"

export default function Login({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-white to-emerald-50 px-4 py-8">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        
        <div className="mb-8 text-center">
          <img src="/applogo.png" className="w-24 h-24 mx-auto object-contain" />

          <h1 className="text-3xl font-semibold tracking-tight">
            <span className="text-gray-800">MyHouse</span>
            <span className="text-emerald-600">Finance</span>
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Manage your home finances easily
          </p>
        </div>

        <AuthForm 
          isLogin={isLogin} 
          setIsLogin={setIsLogin} 
          onLogin={onLogin} 
        />

        <p className="mt-6 text-center text-xs text-gray-400">
          Secure login powered by MyHouseFinance
        </p>
      </div>
    </main>
  )
}