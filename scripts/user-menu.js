document.addEventListener("DOMContentLoaded", () => {
  const userButton = document.getElementById("userButton")
  const userMenu = document.getElementById("userMenu")

  // Проверяем авторизацию
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))
  if (currentUser) {
    const avatar = document.querySelector(".user-avatar")
    avatar.innerHTML = `<img src="${currentUser.avatar}" alt="${currentUser.nickname}">`

    // Проверяем доступ к созданию маршрутов
    if (currentUser.isVerifiedForRoutes) {
      // Полное меню для верифицированных
      userMenu.innerHTML = `
        <a class="menu-item" href="profile.html">Profile</a>
        <div class="menu-item">Login and security</div>
        <div class="menu-item">Settings</div>
        <div class="menu-divider"></div>
        <a href="create-route.html" class="create-route-btn">
          <span class="icon-plus"></span>
          <span>Create a route</span>
        </a>
        <div class="menu-item">Your routes</div>
        <div class="menu-item">Analytics</div>
        <div class="menu-item">Payments</div>
        <div class="menu-item" id="signOut">Sign out</div>
        <div class="social-links">
          <div class="social-link"></div>
          <div class="social-link"></div>
          <div class="social-link"></div>
          <div class="social-link"></div>
        </div>
      `

      // Add role badge if user is an admin or author
      if (currentUser.role === "admin" || currentUser.role === "author") {
        const profileItem = userMenu.querySelector("a.menu-item")
        profileItem.innerHTML += `<span class="role-badge">${currentUser.role}</span>`
      }
    } else {
      // Урезанное меню для неверифицированных
      userMenu.innerHTML = `
        <a class="menu-item" href="profile.html">Profile</a>
        <div class="menu-item">Login and security</div>
        <div class="menu-item">Settings</div>
        <div class="menu-divider"></div>
        ${
          currentUser.hasSubmittedVerificationForm
            ? `<div class="verify-success">Form successfully submitted <span class="icon-check">✔</span></div>`
            : `<button class="verify-routes-btn">Get access to create routes</button>`
        }
        <div class="menu-item" id="signOut">Sign out</div>
        <div class="social-links">
          <div class="social-link"></div>
          <div class="social-link"></div>
          <div class="social-link"></div>
          <div class="social-link"></div>
        </div>
      `
      // Обработчик для кнопки верификации (если форма не отправлена)
      if (!currentUser.hasSubmittedVerificationForm) {
        const verifyRoutesBtn = userMenu.querySelector(".verify-routes-btn")
        verifyRoutesBtn.addEventListener("click", () => {
          window.location.href = "verify-routes.html"
        })
      }
    }

    // Обработчик выхода
    const signOutBtn = document.getElementById("signOut")
    signOutBtn.addEventListener("click", () => {
      localStorage.removeItem("currentUser")
      userMenu.classList.remove("active")
      const avatar = document.querySelector(".user-avatar")
      avatar.innerHTML = ""
      window.location.href = "europe.html"
    })

    // Add event listener for create route button if it exists
    const createRouteBtn = userMenu.querySelector(".create-route-btn")
    if (createRouteBtn) {
      createRouteBtn.addEventListener("click", () => {
        window.location.href = "create-route.html"
      })
    }
  } else {
    // Меню для незалогиненных
    userMenu.innerHTML = `
      <button class="sign-in-btn">Sign in to see more</button>
      <div class="social-links">
        <div class="social-link"></div>
        <div class="social-link"></div>
        <div class="social-link"></div>
        <div class="social-link"></div>
      </div>
    `
    // Обработчик для кнопки логина
    const signInBtn = userMenu.querySelector(".sign-in-btn")
    signInBtn.addEventListener("click", () => {
      window.location.href = "login.html"
    })
  }

  userButton.addEventListener("click", () => {
    userMenu.classList.toggle("active")
  })

  // Close menu when clicking outside
  document.addEventListener("click", (event) => {
    if (userButton && userMenu && !userButton.contains(event.target) && !userMenu.contains(event.target)) {
      userMenu.classList.remove("active")
    }
  })
})
