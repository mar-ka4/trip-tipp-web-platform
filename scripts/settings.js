document.addEventListener("DOMContentLoaded", () => {
  // Загружаем сохраненные настройки пользователя
  function loadUserSettings() {
    // Загружаем тему
    const savedTheme = localStorage.getItem("userTheme") || "dark"

    // Отмечаем кнопку активной темы
    const activeThemeBtn = document.querySelector(`.theme-toggle-btn[data-theme="${savedTheme}"]`)
    if (activeThemeBtn) {
      document.querySelectorAll(".theme-toggle-btn").forEach((btn) => btn.classList.remove("active"))
      activeThemeBtn.classList.add("active")
    }

    // Apply theme
    applyTheme(savedTheme)

    const savedDistanceUnit = localStorage.getItem("distanceUnit") || "km"
    document.getElementById("distance-unit").value = savedDistanceUnit

    const savedTemperatureUnit = localStorage.getItem("temperatureUnit") || "celsius"
    document.getElementById("temperature-unit").value = savedTemperatureUnit

    const savedCurrency = localStorage.getItem("userCurrency") || "rub"
    document.getElementById("currency-select").value = savedCurrency

    // Загружаем язык перевода маршрутов вместо формата даты
    const savedTranslateLanguage = localStorage.getItem("translateLanguage") || "original"
    document.getElementById("translate-language").value = savedTranslateLanguage

    // Настройки приватности
    const profileVisibility = localStorage.getItem("profileVisibility") === "false" ? false : true
    document.getElementById("profile-visibility-toggle").checked = profileVisibility

    const showEmail = localStorage.getItem("showEmail") === "true"
    document.getElementById("show-email-toggle").checked = showEmail

    const showLocation = localStorage.getItem("showLocation") === "true"
    document.getElementById("show-location-toggle").checked = showLocation

    const showActivity = localStorage.getItem("showActivity") === "false" ? false : true
    document.getElementById("show-activity-toggle").checked = showActivity

    const saveSearchHistory = localStorage.getItem("saveSearchHistory") === "false" ? false : true
    document.getElementById("save-search-history-toggle").checked = saveSearchHistory

    // Настройки уведомлений безопасности
    const loginAlerts = localStorage.getItem("loginAlerts") === "false" ? false : true
    document.getElementById("login-alerts-toggle").checked = loginAlerts

    const securityAlerts = localStorage.getItem("securityAlerts") === "false" ? false : true
    document.getElementById("security-alerts-toggle").checked = securityAlerts

    const accountChanges = localStorage.getItem("accountChanges") === "false" ? false : true
    document.getElementById("account-changes-toggle").checked = accountChanges

    // Email уведомления
    const emailNotifications = JSON.parse(localStorage.getItem("emailNotifications")) || {
      newFollower: true,
      routeComment: true,
      routeLike: false,
      newsletter: true,
    }

    document.getElementById("email-new-follower-toggle").checked = emailNotifications.newFollower
    document.getElementById("email-route-comment-toggle").checked = emailNotifications.routeComment
    document.getElementById("email-route-like-toggle").checked = emailNotifications.routeLike
    document.getElementById("email-newsletter-toggle").checked = emailNotifications.newsletter
  }

  // Сохраняем настройки пользователя
  function saveUserSettings() {
    // Сохраняем выбранный язык перевода маршрутов
    const translateLanguage = document.getElementById("translate-language").value
    localStorage.setItem("translateLanguage", translateLanguage)

    // Остальные настройки сохраняем как обычно...
    const distanceUnit = document.getElementById("distance-unit").value
    localStorage.setItem("distanceUnit", distanceUnit)

    const temperatureUnit = document.getElementById("temperature-unit").value
    localStorage.setItem("temperatureUnit", temperatureUnit)

    const currency = document.getElementById("currency-select").value
    localStorage.setItem("userCurrency", currency)

    // Тема сохраняется при клике на кнопку переключения темы

    // Настройки приватности
    const profileVisibility = document.getElementById("profile-visibility-toggle").checked
    localStorage.setItem("profileVisibility", profileVisibility)

    const showEmail = document.getElementById("show-email-toggle").checked
    localStorage.setItem("showEmail", showEmail)

    const showLocation = document.getElementById("show-location-toggle").checked
    localStorage.setItem("showLocation", showLocation)

    const showActivity = document.getElementById("show-activity-toggle").checked
    localStorage.setItem("showActivity", showActivity)

    const saveSearchHistory = document.getElementById("save-search-history-toggle").checked
    localStorage.setItem("saveSearchHistory", saveSearchHistory)

    // Настройки уведомлений безопасности
    const loginAlerts = document.getElementById("login-alerts-toggle").checked
    localStorage.setItem("loginAlerts", loginAlerts)

    const securityAlerts = document.getElementById("security-alerts-toggle").checked
    localStorage.setItem("securityAlerts", securityAlerts)

    const accountChanges = document.getElementById("account-changes-toggle").checked
    localStorage.setItem("accountChanges", accountChanges)

    // Email уведомления
    const emailNotifications = {
      newFollower: document.getElementById("email-new-follower-toggle").checked,
      routeComment: document.getElementById("email-route-comment-toggle").checked,
      routeLike: document.getElementById("email-route-like-toggle").checked,
      newsletter: document.getElementById("email-newsletter-toggle").checked,
    }
    localStorage.setItem("emailNotifications", JSON.stringify(emailNotifications))

    // Показываем уведомление об успешном сохранении
    showNotification("Настройки успешно сохранены")
  }

  // Функция для отображения уведомления
  function showNotification(message) {
    // Создаем элемент уведомления
    const notification = document.createElement("div")
    notification.className = "settings-notification"
    notification.textContent = message

    // Добавляем уведомление на страницу
    document.body.appendChild(notification)

    // Добавляем стили для уведомления
    notification.style.position = "fixed"
    notification.style.bottom = "20px"
    notification.style.right = "20px"
    notification.style.backgroundColor = "#747bf1"
    notification.style.color = "white"
    notification.style.padding = "12px 20px"
    notification.style.borderRadius = "8px"
    notification.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)"
    notification.style.zIndex = "1000"
    notification.style.opacity = "0"
    notification.style.transform = "translateY(20px)"
    notification.style.transition = "opacity 0.3s, transform 0.3s"

    // Показываем уведомление с анимацией
    setTimeout(() => {
      notification.style.opacity = "1"
      notification.style.transform = "translateY(0)"
    }, 10)

    // Скрываем и удаляем уведомление через 3 секунды
    setTimeout(() => {
      notification.style.opacity = "0"
      notification.style.transform = "translateY(20px)"

      setTimeout(() => {
        document.body.removeChild(notification)
      }, 300)
    }, 3000)
  }

  // Добавляем обработчики событий для кнопок сохранения
  const saveButton = document.querySelector(".settings-save-btn")
  if (saveButton) {
    saveButton.addEventListener("click", saveUserSettings)
  }

  // Добавляем обработчики для переключателей
  const toggles = document.querySelectorAll(".toggle-switch input")
  toggles.forEach((toggle) => {
    toggle.addEventListener("change", () => {
      // Автоматически сохраняем настройки при изменении переключателя
      saveUserSettings()
    })
  })

  // Обработчики для переключателей темы
  const themeToggleBtns = document.querySelectorAll(".theme-toggle-btn")
  themeToggleBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Убираем активный класс у всех кнопок
      themeToggleBtns.forEach((b) => b.classList.remove("active"))
      // Добавляем активный класс к нажатой кнопке
      btn.classList.add("active")
      // Сохраняем тему
      const theme = btn.getAttribute("data-theme")
      localStorage.setItem("userTheme", theme)

      // Применяем тему
      applyTheme(theme)
    })
  })

  // Функция для применения темы
  function applyTheme(theme) {
    const body = document.body
    if (theme === "system") {
      // Проверяем системные настройки
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      body.classList.toggle("light-theme", !prefersDark)
      body.classList.toggle("dark-theme", prefersDark)
    } else if (theme === "light") {
      body.classList.add("light-theme")
      body.classList.remove("dark-theme")
    } else {
      body.classList.add("dark-theme")
      body.classList.remove("light-theme")
    }
  }

  // Инициализация: загружаем настройки
  loadUserSettings()
})
