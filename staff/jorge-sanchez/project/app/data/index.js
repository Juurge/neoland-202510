export const data = {
  setUser(user) {
    localStorage.setItem("user", JSON.stringify(user))
  },

  getUser() {
    const user = localStorage.getItem("user")

    if (!user) return null

    return JSON.parse(user)
  },

  removeUser() {
    localStorage.removeItem("user")
  },

  setToken(token) {
    localStorage.setItem("token", token)
  },

  getToken() {
    return localStorage.getItem("token")
  },

  removeToken() {
    localStorage.removeItem("token")
  },
}