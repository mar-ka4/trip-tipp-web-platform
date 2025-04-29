import usersData from "./usersData.js"

document.addEventListener("DOMContentLoaded", () => {
  // Загрузка данных текущего пользователя
  // В реальном приложении здесь будет логика получения текущего пользователя
  // Для демонстрации используем первого пользователя из базы
  const currentUser = usersData[0] // mar_ka4

  // Заполнение информации об аккаунте
  document.getElementById("username").textContent = currentUser.nickname
  document.getElementById("email").textContent = currentUser.email
  document.getElementById("phone").textContent = currentUser.phone || "Не указан"

  // Форматирование даты регистрации
  const accountCreatedDate = new Date(currentUser.accountCreated)
  document.getElementById("accountCreated").textContent = new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(accountCreatedDate)

  // Настройка двухфакторной аутентификации
  const twoFactorStatus = document.getElementById("twoFactorStatus")
  const toggleTwoFactorBtn = document.getElementById("toggleTwoFactorBtn")
  const twoFactorMethods = document.getElementById("twoFactorMethods")

  if (currentUser.twoFactorAuth.enabled) {
    twoFactorStatus.textContent = "Включено"
    twoFactorStatus.className = "info-value status-active"
    toggleTwoFactorBtn.textContent = "Отключить"

    // Выбор текущего метода 2FA
    if (currentUser.twoFactorAuth.method) {
      const methodRadio = document.querySelector(`input[value="${currentUser.twoFactorAuth.method}"]`)
      if (methodRadio) methodRadio.checked = true
    }
  } else {
    twoFactorStatus.textContent = "Отключено"
    twoFactorStatus.className = "info-value status-inactive"
    toggleTwoFactorBtn.textContent = "Включить"
  }

  toggleTwoFactorBtn.addEventListener("click", () => {
    if (currentUser.twoFactorAuth.enabled) {
      // Логика отключения 2FA
      currentUser.twoFactorAuth.enabled = false
      twoFactorStatus.textContent = "Отключено"
      twoFactorStatus.className = "info-value status-inactive"
      toggleTwoFactorBtn.textContent = "Включить"
      twoFactorMethods.style.display = "none"
    } else {
      // Показать опции для включения 2FA
      twoFactorMethods.style.display = "block"
    }
  })

  // Обработка сохранения метода 2FA
  document.getElementById("saveTwoFactorMethod").addEventListener("click", () => {
    const selectedMethod = document.querySelector('input[name="twoFactorMethod"]:checked')
    if (selectedMethod) {
      currentUser.twoFactorAuth.enabled = true
      currentUser.twoFactorAuth.method = selectedMethod.value
      twoFactorStatus.textContent = "Включено"
      twoFactorStatus.className = "info-value status-active"
      toggleTwoFactorBtn.textContent = "Отключить"
      twoFactorMethods.style.display = "none"

      // В реальном приложении здесь будет логика сохранения на сервере
      alert("Двухфакторная аутентификация включена!")
    } else {
      alert("Пожалуйста, выберите метод аутентификации")
    }
  })

  // Заполнение резервного email
  const backupEmailElement = document.getElementById("backupEmail")
  if (currentUser.backupEmail) {
    backupEmailElement.textContent = currentUser.backupEmail
  } else {
    backupEmailElement.textContent = "Не указан"
    backupEmailElement.className = "info-value status-inactive"
  }

  // Настройка уведомлений безопасности
  document.getElementById("loginAlerts").checked = currentUser.securityNotifications.loginAlerts
  document.getElementById("securityAlerts").checked = currentUser.securityNotifications.securityAlerts
  document.getElementById("accountChanges").checked = currentUser.securityNotifications.accountChanges

  // Обработчики для переключателей уведомлений
  const notificationToggles = document.querySelectorAll(".toggle-switch input")
  notificationToggles.forEach((toggle) => {
    toggle.addEventListener("change", function () {
      const notificationType = this.id
      currentUser.securityNotifications[notificationType] = this.checked

      // В реальном приложении здесь будет логика сохранения на сервере
      alert(`Настройка "${notificationType}" ${this.checked ? "включена" : "отключена"}`)
    })
  })

  // Password change form toggle
  const changePasswordBtn = document.getElementById("changePasswordBtn")
  const passwordChangeForm = document.getElementById("passwordChangeForm")

  if (changePasswordBtn && passwordChangeForm) {
    changePasswordBtn.addEventListener("click", () => {
      passwordChangeForm.style.display = passwordChangeForm.style.display === "block" ? "none" : "block"
      changePasswordBtn.textContent = passwordChangeForm.style.display === "block" ? "Отмена" : "Изменить"
    })
  }

  // Password strength meter
  const newPasswordInput = document.getElementById("newPassword")
  const strengthIndicator = document.querySelector(".strength-indicator")
  const strengthText = document.querySelector(".strength-text")

  if (newPasswordInput && strengthIndicator && strengthText) {
    newPasswordInput.addEventListener("input", function () {
      const password = this.value
      let strength = 0

      // Calculate password strength
      if (password.length >= 8) strength += 1
      if (password.match(/[A-Z]/)) strength += 1
      if (password.match(/[0-9]/)) strength += 1
      if (password.match(/[^A-Za-z0-9]/)) strength += 1

      // Update UI based on strength
      switch (strength) {
        case 0:
          strengthIndicator.style.width = "10%"
          strengthIndicator.style.backgroundColor = "#e74c3c"
          strengthText.textContent = "Очень слабый"
          strengthText.style.color = "#e74c3c"
          break
        case 1:
          strengthIndicator.style.width = "25%"
          strengthIndicator.style.backgroundColor = "#e74c3c"
          strengthText.textContent = "Слабый"
          strengthText.style.color = "#e74c3c"
          break
        case 2:
          strengthIndicator.style.width = "50%"
          strengthIndicator.style.backgroundColor = "#f39c12"
          strengthText.textContent = "Средний"
          strengthText.style.color = "#f39c12"
          break
        case 3:
          strengthIndicator.style.width = "75%"
          strengthIndicator.style.backgroundColor = "#3498db"
          strengthText.textContent = "Сильный"
          strengthText.style.color = "#3498db"
          break
        case 4:
          strengthIndicator.style.width = "100%"
          strengthIndicator.style.backgroundColor = "#2ecc71"
          strengthText.textContent = "Очень сильный"
          strengthText.style.color = "#2ecc71"
          break
      }
    })
  }

  // Form submission handling
  const saveButton = document.querySelector(".save-button")
  const cancelButton = document.querySelector(".cancel-button")

  if (saveButton) {
    saveButton.addEventListener("click", (e) => {
      e.preventDefault()

      const currentPassword = document.getElementById("currentPassword").value
      const newPassword = document.getElementById("newPassword").value
      const confirmPassword = document.getElementById("confirmPassword").value

      // Simple validation
      if (!currentPassword || !newPassword || !confirmPassword) {
        alert("Пожалуйста, заполните все поля пароля")
        return
      }

      if (newPassword !== confirmPassword) {
        alert("Новые пароли не совпадают")
        return
      }

      // Проверка текущего пароля
      if (currentPassword !== currentUser.password) {
        alert("Неверный текущий пароль")
        return
      }

      // Здесь будет логика обновления пароля на сервере
      currentUser.password = newPassword
      alert("Пароль успешно изменен!")
      passwordChangeForm.style.display = "none"
      changePasswordBtn.textContent = "Изменить"

      // Очистка формы
      document.getElementById("currentPassword").value = ""
      document.getElementById("newPassword").value = ""
      document.getElementById("confirmPassword").value = ""
    })
  }

  if (cancelButton) {
    cancelButton.addEventListener("click", (e) => {
      e.preventDefault()
      passwordChangeForm.style.display = "none"
      changePasswordBtn.textContent = "Изменить"

      // Очистка формы
      document.getElementById("currentPassword").value = ""
      document.getElementById("newPassword").value = ""
      document.getElementById("confirmPassword").value = ""
    })
  }

  // Обработчик для кнопки изменения резервного email
  const changeBackupEmailBtn = document.getElementById("changeBackupEmailBtn")
  if (changeBackupEmailBtn) {
    changeBackupEmailBtn.addEventListener("click", () => {
      const newBackupEmail = prompt("Введите новый резервный email:", currentUser.backupEmail || "")
      if (newBackupEmail !== null) {
        // Простая валидация email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (newBackupEmail === "" || emailRegex.test(newBackupEmail)) {
          currentUser.backupEmail = newBackupEmail
          backupEmailElement.textContent = newBackupEmail || "Не указан"
          if (!newBackupEmail) {
            backupEmailElement.className = "info-value status-inactive"
          } else {
            backupEmailElement.className = "info-value"
          }
          alert("Резервный email успешно обновлен!")
        } else {
          alert("Пожалуйста, введите корректный email")
        }
      }
    })
  }
})
