import usersData from "./usersData.js"
import { validateSecretKey } from "./secret-keys.js"

document.addEventListener("DOMContentLoaded", () => {
  const loginToggle = document.getElementById("login-toggle")
  const signupToggle = document.getElementById("signup-toggle")
  const loginForm = document.getElementById("login-form")
  const signupForm = document.getElementById("signup-form")
  const loginButton = document.getElementById("login-button")
  const signupButton = document.getElementById("signup-button")
  const loginError = document.getElementById("login-error")
  const signupError = document.getElementById("signup-error")
  const signupSuccess = document.getElementById("signup-success")

  // Переключение форм
  loginToggle.addEventListener("click", () => {
    loginToggle.classList.add("active")
    signupToggle.classList.remove("active")
    loginForm.style.display = "block"
    signupForm.style.display = "none"
    loginError.classList.remove("active")
    signupError.classList.remove("active")
    if (signupSuccess) signupSuccess.classList.remove("active")
  })

  signupToggle.addEventListener("click", () => {
    signupToggle.classList.add("active")
    loginToggle.classList.remove("active")
    loginForm.style.display = "none"
    signupForm.style.display = "block"
    loginError.classList.remove("active")
    signupError.classList.remove("active")
    if (signupSuccess) signupSuccess.classList.remove("active")
  })

  // Логин
  loginButton.addEventListener("click", (e) => {
    e.preventDefault()
    const username = document.getElementById("login-username").value.trim()
    const password = document.getElementById("login-password").value

    if (!username || !password) {
      loginError.textContent = "Заполните все поля"
      loginError.classList.add("active")
      return
    }

    const user = usersData.find((u) => u.nickname === username && u.password === password)
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user))
      window.location.href = "europe.html" // Редирект на главную
    } else {
      loginError.textContent = "Неверный никнейм или пароль"
      loginError.classList.add("active")
    }
  })

  // Регистрация
  signupButton.addEventListener("click", (e) => {
    e.preventDefault()
    const fullName = document.getElementById("signup-name").value.trim()
    const username = document.getElementById("signup-username").value.trim()
    const password = document.getElementById("signup-password").value
    const confirmPassword = document.getElementById("signup-confirm-password").value
    const secretKey = document.getElementById("signup-secret-key")
      ? document.getElementById("signup-secret-key").value.trim()
      : ""

    // Reset error messages
    signupError.classList.remove("active")
    if (signupSuccess) signupSuccess.classList.remove("active")

    if (!fullName || !username || !password || !confirmPassword) {
      signupError.textContent = "Заполните все обязательные поля"
      signupError.classList.add("active")
      return
    }

    if (password !== confirmPassword) {
      signupError.textContent = "Пароли не совпадают"
      signupError.classList.add("active")
      return
    }

    if (usersData.find((u) => u.nickname === username)) {
      signupError.textContent = "Никнейм уже занят"
      signupError.classList.add("active")
      return
    }

    // Check if secret key is valid
    let isVerifiedForRoutes = false
    let userRole = "user"
    let keyValidated = false

    if (secretKey) {
      const validKey = validateSecretKey(secretKey)
      if (validKey) {
        isVerifiedForRoutes = true
        userRole = validKey.level
        keyValidated = true

        if (signupSuccess) {
          signupSuccess.textContent = `Secret key accepted! You now have ${userRole} privileges.`
          signupSuccess.classList.add("active")
        } else {
          // If success element doesn't exist, create a temporary alert
          alert(`Secret key accepted! You now have ${userRole} privileges.`)
        }
      } else if (secretKey) {
        signupError.textContent = "Invalid or expired secret key"
        signupError.classList.add("active")
        return
      }
    }

    const newUser = {
      nickname: username,
      avatar: "img/default-avatar.jpg",
      description: `Привет, я ${fullName}! Люблю путешествия!`,
      visitedCountries: "0",
      createdRoutes: "0",
      password: password,
      isVerifiedForRoutes: isVerifiedForRoutes,
      role: userRole,
      hasSubmittedVerificationForm: false,
      userStatus: isVerifiedForRoutes ? "гид" : "турист",
    }

    usersData.push(newUser)
    localStorage.setItem("currentUser", JSON.stringify(newUser))

    // Show success message and redirect after a short delay if key was validated
    if (keyValidated) {
      setTimeout(() => {
        window.location.href = "europe.html" // Redirect to main page
      }, 1500)
    } else {
      window.location.href = "europe.html" // Redirect immediately if no key
    }
  })
})
