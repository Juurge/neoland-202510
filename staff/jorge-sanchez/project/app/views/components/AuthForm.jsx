import { useState } from "react"

import loginUser from "../../logic/loginUser"
import registerUser from "../../logic/registerUser"

export default function AuthForm({ isLogin, setIsLogin, onLogin }) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isCapsLockOn, setIsCapsLockOn] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleKeyUp = event => {
    setIsCapsLockOn(event.getModifierState("CapsLock"))
  }

  const resetMessages = () => {
    setError("")
    setSuccess("")
  }

  const resetForm = () => {
    setName("")
    setEmail("")
    setPassword("")
  }

  const handleLogin = () => {
    resetMessages()

    loginUser(email, password)
      .then(user => {
        if (user.error) {
          setError(user.error)
          return
        }

        onLogin(user)
      })
      .catch(() => setError("Connection error"))
  }

  const handleRegister = () => {
    resetMessages()

    registerUser(name, email, password)
      .then(user => {
        if (user.error) {
          setError(user.error)
          return
        }

        setSuccess("User created. Now login.")
        resetForm()
        setIsLogin(true)
      })
      .catch(() => setError("Connection error"))
  }

  const handleGoToRegister = () => {
    resetMessages()
    resetForm()
    setIsLogin(false)
  }

  const handleGoToLogin = () => {
    resetMessages()
    resetForm()
    setIsLogin(true)
  }

  return isLogin ? (
    <form className="flex flex-col gap-4">

      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        onKeyUp={handleKeyUp}
        className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-emerald-500"
      />

      <input
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        onKeyUp={handleKeyUp}
        className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-emerald-500"
      />

      {isCapsLockOn && (
        <p className="text-xs text-red-500">
          Caps Lock is ON
        </p>
      )}

      {error && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </p>
      )}

      {success && (
        <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {success}
        </p>
      )}

      <button
        type="button"
        onClick={handleLogin}
        className="rounded-lg bg-emerald-500 px-4 py-3 font-semibold text-white transition hover:bg-emerald-600"
      >
        Login
      </button>

      <p className="text-center text-sm text-gray-600">
        Don&apos;t have an account?{" "}
        <span
          className="cursor-pointer font-semibold text-emerald-600"
          onClick={handleGoToRegister}
        >
          Sign up
        </span>
      </p>
    </form>
  ) : (
    <form className="flex flex-col gap-4">

      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={e => setName(e.target.value)}
        className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-emerald-500"
      />

      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        onKeyUp={handleKeyUp}
        className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-emerald-500"
      />

      <input
        type="password"
        placeholder="Create a password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        onKeyUp={handleKeyUp}
        className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-emerald-500"
      />

      {isCapsLockOn && (
        <p className="text-xs text-red-500">
          Caps Lock is ON
        </p>
      )}

      {error && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </p>
      )}

      {success && (
        <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {success}
        </p>
      )}

      <button
        type="button"
        onClick={handleRegister}
        className="rounded-lg bg-emerald-500 px-4 py-3 font-semibold text-white transition hover:bg-emerald-600"
      >
        Create account
      </button>

      <p className="text-center text-sm text-gray-600">
        Already have an account?{" "}
        <span
          className="cursor-pointer font-semibold text-emerald-600"
          onClick={handleGoToLogin}
        >
          Login
        </span>
      </p>
    </form>
  )
}