document.addEventListener("DOMContentLoaded", () => {
    // Массив для хранения изображений первого шага
    const routeImages = []
  
    // Элементы для загрузки фотографий
    const photoUpload = document.querySelector(".cr-photo-upload")
    const addPhotoBtn = document.querySelector(".cr-add-photo-btn")
    const photoInput = document.querySelector("#cr-photo-upload-input")
    const photoPlaceholders = document.querySelectorAll(".cr-photo-placeholder")
  
    // Инициализация отображения всех шагов (видимые, но неактивные)
    initializeSteps()
  
    // Функция для инициализации отображения всех шагов
    function initializeSteps() {
      // Показываем все шаги, но делаем неактивными второй и третий
      const routePoints = document.querySelector(".cr-route-points")
      const routeCoordinates = document.querySelector(".cr-route-coordinates")
  
      // Показываем шаги вместо скрытия
      routePoints.style.display = "block"
      routeCoordinates.style.display = "block"
  
      // Добавляем класс для блюра и неактивности
      routePoints.classList.add("cr-step-inactive")
      routeCoordinates.classList.add("cr-step-inactive")
  
      // Добавляем стили для неактивных шагов, если их еще нет
      if (!document.getElementById("cr-step-styles")) {
        const styleElement = document.createElement("style")
        styleElement.id = "cr-step-styles"
        styleElement.textContent = `
                  .cr-step-inactive {
                      filter: blur(3px);
                      pointer-events: none;
                      opacity: 0.7;
                      position: relative;
                  }
                  .cr-step-inactive::before {
                      content: "";
                      position: absolute;
                      top: 0;
                      left: 0;
                      right: 0;
                      bottom: 0;
                      z-index: 10;
                      background: rgba(0, 0, 0, 0.1);
                      border-radius: 15px;
                  }
              `
        document.head.appendChild(styleElement)
      }
    }
  
    // Функция для проверки, сколько фотографий уже загружено, и обновления состояния кнопки
    const updateAddPhotoButtonState = () => {
      const loadedPhotos = Array.from(photoPlaceholders).filter((placeholder) => placeholder.querySelector("img")).length
      addPhotoBtn.disabled = loadedPhotos >= 5 // Отключаем кнопку, если загружено 5 фотографий
    }
  
    // Обработка клика по кнопке "Add Photo"
    addPhotoBtn.addEventListener("click", () => {
      photoInput.click() // Программно вызываем клик по input
    })
  
    // Обработка загрузки фотографий
    photoInput.addEventListener("change", (event) => {
      const files = Array.from(event.target.files)
      if (files.length === 0) return
  
      // Проверяем формат файлов
      const validFormats = ["image/png", "image/jpeg"]
      const invalidFiles = files.filter((file) => !validFormats.includes(file.type))
      if (invalidFiles.length > 0) {
        alert("Please upload only PNG or JPG images.")
        event.target.value = "" // Очищаем input
        return
      }
  
      // Находим пустые placeholders
      const emptyPlaceholders = Array.from(photoPlaceholders).filter((placeholder) => !placeholder.querySelector("img"))
  
      // Ограничиваем количество загружаемых файлов до доступных мест
      const filesToProcess = files.slice(0, emptyPlaceholders.length)
  
      // Распределяем файлы по пустым placeholders
      filesToProcess.forEach((file, fileIndex) => {
        const placeholder = emptyPlaceholders[fileIndex]
        const placeholderIndex = Array.from(photoPlaceholders).indexOf(placeholder)
        const removeBtn = placeholder.querySelector(".cr-remove-photo-btn")
  
        const reader = new FileReader()
        reader.onload = (e) => {
          // Создаём новое изображение
          const img = document.createElement("img")
          img.src = e.target.result
          placeholder.appendChild(img)
  
          // Скрываем иконку камеры
          const cameraIcon = placeholder.querySelector(".fas.fa-camera")
          cameraIcon.style.display = "none"
  
          // Показываем кнопку удаления
          removeBtn.style.display = "flex"
  
          // Сохраняем файл в routeImages
          routeImages[placeholderIndex] = file
  
          // Обновляем состояние кнопки "Add Photo"
          updateAddPhotoButtonState()
  
          console.log("Updated routeImages:", routeImages)
        }
        reader.readAsDataURL(file)
      })
  
      // Очищаем input после загрузки
      event.target.value = ""
    })
  
    // Обработка удаления фотографий
    photoPlaceholders.forEach((placeholder, index) => {
      const removeBtn = placeholder.querySelector(".cr-remove-photo-btn")
  
      removeBtn.addEventListener("click", () => {
        // Удаляем изображение
        const img = placeholder.querySelector("img")
        if (img) {
          img.remove()
        }
  
        // Показываем иконку камеры
        const cameraIcon = placeholder.querySelector(".fas.fa-camera")
        cameraIcon.style.display = "block"
  
        // Скрываем кнопку удаления
        removeBtn.style.display = "none"
  
        // Удаляем файл из routeImages
        routeImages[index] = null
  
        // Обновляем состояние кнопки "Add Photo"
        updateAddPhotoButtonState()
  
        console.log("Updated routeImages after removal:", routeImages)
      })
    })
  
    // Инициализация состояния кнопки "Add Photo"
    updateAddPhotoButtonState()
  
    // Обработчик отправки формы первого шага
    document.getElementById("cr-route-form").addEventListener("submit", (e) => {
      e.preventDefault()
  
      // Собираем данные из формы
      const routeName = document.getElementById("cr-route-name").value
      const shortContent = document.getElementById("cr-short-content").value
      const difficulty = document.getElementById("cr-difficulty").value
      const duration = document.getElementById("cr-duration").value
      const type = document.getElementById("cr-type").value
      const description = document.getElementById("cr-description").value
      const images = routeImages.filter((img) => img !== null) // Фильтруем null значения
  
      console.log({
        routeName,
        shortContent,
        difficulty,
        duration,
        type,
        description,
        images,
      })
  
      // Активируем второй шаг (убираем блюр и делаем интерактивным)
      const routePoints = document.querySelector(".cr-route-points")
      routePoints.classList.remove("cr-step-inactive")
  
      // Прокручиваем к второму шагу
      routePoints.scrollIntoView({ behavior: "smooth" })
  
      // Автоматически добавляем первую точку, если контейнер пуст
      if (document.querySelectorAll(".cr-point-card").length === 0) {
        addPoint()
      }
    })
  
    // Контейнер для точек и кнопка сохранения
    const pointsContainer = document.getElementById("cr-points-container")
    const saveRouteBtn = document.getElementById("cr-save-route-btn")
    let pointCount = 0
    let savedPoints = [] // Для хранения точек после второго шага
  
    // Функция для добавления новой точки
    function addPoint() {
      pointCount++
      const pointCard = document.createElement("div")
      pointCard.classList.add("cr-point-card")
      pointCard.innerHTML = `
              <h3>Point ${pointCount}</h3>
              <div class="cr-form-group">
                  <label for="cr-point-name-${pointCount}">Write the name of the point</label>
                  <input type="text" id="cr-point-name-${pointCount}" name="cr-point-name" placeholder="Example: Eiffel Tower" required>
              </div>
              <div class="cr-form-group">
                  <label>Add an image of the point</label>
                  <div class="cr-photo-upload">
                      <label class="cr-photo-placeholder"><i class="fas fa-camera"></i><input type="file" accept="image/png,image/jpeg"></label>
                      <label class="cr-photo-placeholder"><i class="fas fa-camera"></i><input type="file" accept="image/png,image/jpeg"></label>
                      <label class="cr-photo-placeholder"><i class="fas fa-camera"></i><input type="file" accept="image/png,image/jpeg"></label>
                  </div>
              </div>
              <div class="cr-form-group">
                  <label for="cr-point-description-${pointCount}">Write a description of the point</label>
                  <textarea id="cr-point-description-${pointCount}" name="cr-point-description" placeholder="Describe in detail what your route includes" rows="5" required></textarea>
              </div>
              <button type="button" class="cr-remove-btn"><i class="fas fa-trash-alt"></i></button>
          `
  
      // Обработчик удаления точки с подтверждением
      pointCard.querySelector(".cr-remove-btn").addEventListener("click", () => {
        if (confirm("Are you sure you want to remove this point?")) {
          pointCard.remove()
          pointCount--
          updatePointNumbers()
          updateSaveButtonState()
        }
      })
  
      // Обработчик загрузки изображений
      pointCard.querySelectorAll('.cr-photo-placeholder input[type="file"]').forEach((input, index) => {
        input.addEventListener("change", (e) => {
          const file = e.target.files[0]
          if (file) {
            // Проверяем формат файла
            const validFormats = ["image/png", "image/jpeg"]
            if (!validFormats.includes(file.type)) {
              alert("Please upload a PNG or JPG image.")
              e.target.value = "" // Очищаем input
              return
            }
  
            // Создаем URL для предварительного просмотра
            const reader = new FileReader()
            reader.onload = (event) => {
              const img = document.createElement("img")
              img.src = event.target.result
              const placeholder = input.parentElement
              placeholder.innerHTML = "" // Удаляем иконку камеры
              placeholder.appendChild(img) // Добавляем изображение
            }
            reader.readAsDataURL(file)
  
            // Сохраняем файл в savedPoints
            if (!savedPoints[pointCount - 1]) {
              savedPoints[pointCount - 1] = { images: [] }
            }
            savedPoints[pointCount - 1].images[index] = file
          }
        })
      })
  
      pointsContainer.appendChild(pointCard)
  
      // Проверяем количество точек и обновляем состояние кнопки
      updateSaveButtonState()
    }
  
    // Функция для обновления номеров точек после удаления
    function updatePointNumbers() {
      document.querySelectorAll(".cr-point-card").forEach((card, index) => {
        card.querySelector("h3").textContent = `Point ${index + 1}`
        const inputs = card.querySelectorAll("input, textarea")
        inputs[0].id = `cr-point-name-${index + 1}`
        inputs[1].id = `cr-point-description-${index + 1}`
      })
    }
  
    // Функция для проверки количества точек и обновления кнопки
    function updateSaveButtonState() {
      const points = document.querySelectorAll(".cr-point-card").length
      if (points >= 5) {
        saveRouteBtn.classList.add("active")
        saveRouteBtn.disabled = false
      } else {
        saveRouteBtn.classList.remove("active")
        saveRouteBtn.disabled = true
      }
    }
  
    // Обработчик кнопки "Add Point"
    document.getElementById("cr-add-point-btn").addEventListener("click", () => {
      addPoint()
    })
  
    // Обработчик кнопки "Save Route" (активация третьего шага)
    document.getElementById("cr-save-route-btn").addEventListener("click", () => {
      const points = document.querySelectorAll(".cr-point-card").length
      if (points < 5) {
        alert("Для сохранения необходимо создать минимум 5 точек")
        return
      }
  
      // Проверка, что все поля заполнены
      let allFilled = true
      document.querySelectorAll(".cr-point-card").forEach((card, index) => {
        const pointName = document.getElementById(`cr-point-name-${index + 1}`).value
        const pointDescription = document.getElementById(`cr-point-description-${index + 1}`).value
        if (!pointName || !pointDescription || pointName.length < 3) {
          allFilled = false
        }
      })
  
      if (!allFilled) {
        alert("Пожалуйста, заполните все поля в точках маршрута (название — минимум 3 символа)")
        return
      }
  
      // Собираем данные точек
      savedPoints = []
      document.querySelectorAll(".cr-point-card").forEach((card, index) => {
        const pointName = document.getElementById(`cr-point-name-${index + 1}`).value
        const pointDescription = document.getElementById(`cr-point-description-${index + 1}`).value
        const images = savedPoints[index]?.images || []
        savedPoints.push({ pointName, pointDescription, images })
      })
  
      console.log("Route points:", savedPoints)
  
      // Делаем кнопку "Save Route" серой и неактивной
      saveRouteBtn.classList.remove("active")
      saveRouteBtn.classList.add("disabled")
      saveRouteBtn.disabled = true
  
      // Активируем третий шаг (убираем блюр и делаем интерактивным)
      const routeCoordinates = document.querySelector(".cr-route-coordinates")
      routeCoordinates.classList.remove("cr-step-inactive")
  
      // Подгружаем карточки точек на третий шаг
      loadCoordinatesPoints()
  
      // Прокручиваем страницу к третьему шагу
      routeCoordinates.scrollIntoView({ behavior: "smooth" })
    })
  
    // Функция для подгрузки карточек точек на третий шаг
    function loadCoordinatesPoints() {
      const coordinatesPointsContainer = document.getElementById("cr-coordinates-points-container")
      coordinatesPointsContainer.innerHTML = "" // Очищаем контейнер
  
      savedPoints.forEach((point, index) => {
        const pointCard = document.createElement("div")
        pointCard.classList.add("cr-coordinates-point-card")
        pointCard.innerHTML = `
                  <div class="cr-point-header">
                      <label class="cr-photo-placeholder"><i class="fas fa-camera"></i><input type="file" accept="image/png,image/jpeg"></label>
                      <div class="cr-point-info">
                          <h3>Point ${index + 1}</h3>
                          <h4>${point.pointName}</h4>
                      </div>
                  </div>
                  <div class="cr-form-group">
                      <input type="text" id="cr-coordinates-${index + 1}" name="cr-coordinates" placeholder="Coordinates">
                  </div>
                  <div class="cr-action-buttons">
                      <button type="button" class="cr-cancel-btn">Cancel</button>
                      <button type="button" class="cr-confirm-btn">Confirm</button>
                  </div>
              `
  
        // Подгружаем первую фотографию из второго шага
        if (point.images && point.images[0]) {
          const reader = new FileReader()
          reader.onload = (event) => {
            const img = document.createElement("img")
            img.src = event.target.result
            const placeholder = pointCard.querySelector(".cr-photo-placeholder")
            placeholder.innerHTML = "" // Удаляем иконку камеры
            placeholder.appendChild(img) // Добавляем изображение
          }
          reader.readAsDataURL(point.images[0])
          console.log(`Loaded first image for point ${index + 1}`)
        }
  
        // Обработчик клика для выделения карточки
        pointCard.addEventListener("click", () => {
          document.querySelectorAll(".cr-coordinates-point-card").forEach((card) => card.classList.remove("active"))
          pointCard.classList.add("active")
          console.log(`Card ${index + 1} selected manually`)
        })
  
        // Обработчик загрузки изображения на третьем шаге
        const photoInput = pointCard.querySelector('.cr-photo-placeholder input[type="file"]')
        photoInput.addEventListener("change", (e) => {
          const file = e.target.files[0]
          if (file) {
            // Проверяем формат файла
            const validFormats = ["image/png", "image/jpeg"]
            if (!validFormats.includes(file.type)) {
              alert("Please upload a PNG or JPG image.")
              e.target.value = "" // Очищаем input
              return
            }
  
            // Создаем URL для предварительного просмотра
            const reader = new FileReader()
            reader.onload = (event) => {
              const img = document.createElement("img")
              img.src = event.target.result
              const placeholder = photoInput.parentElement
              placeholder.innerHTML = "" // Удаляем иконку камеры
              placeholder.appendChild(img) // Добавляем изображение
            }
            reader.readAsDataURL(file)
  
            // Обновляем savedPoints
            savedPoints[index].images[0] = file
          }
        })
  
        // Обработчик для кнопки "Подтвердить"
        const confirmBtn = pointCard.querySelector(".cr-confirm-btn")
        const cancelBtn = pointCard.querySelector(".cr-cancel-btn")
        const input = pointCard.querySelector('input[name="cr-coordinates"]')
  
        confirmBtn.addEventListener("click", () => {
          if (input.value.trim() === "") {
            alert("Please enter coordinates before confirming.")
            return
          }
          confirmBtn.classList.add("disabled")
          confirmBtn.disabled = true
          input.disabled = true
          console.log(`Confirmed coordinates for card ${index + 1}`)
  
          const currentCard = confirmBtn.closest(".cr-coordinates-point-card")
          const allCards = Array.from(coordinatesPointsContainer.querySelectorAll(".cr-coordinates-point-card"))
          const currentIndex = allCards.indexOf(currentCard)
          console.log(`Current card index: ${currentIndex}, Total cards: ${allCards.length}`)
  
          const nextCard = allCards[currentIndex + 1]
          if (nextCard) {
            currentCard.classList.remove("active")
            nextCard.classList.add("active")
            console.log(`Switched to next card: ${currentIndex + 2}`)
            nextCard.scrollIntoView({ behavior: "smooth", block: "nearest" })
          } else {
            console.log("No next card to switch to (last card reached)")
          }
        })
  
        // Обработчик для кнопки "Отмена"
        cancelBtn.addEventListener("click", () => {
          input.value = ""
          input.disabled = false
          confirmBtn.classList.remove("disabled")
          confirmBtn.disabled = false
          console.log(`Cancelled coordinates for card ${index + 1}`)
        })
  
        coordinatesPointsContainer.appendChild(pointCard)
      })
  
      // Автоматически выделяем первую карточку
      const firstCard = coordinatesPointsContainer.querySelector(".cr-coordinates-point-card")
      if (firstCard) {
        firstCard.classList.add("active")
        console.log("First card selected automatically")
      }
    }
  
    // Обработчик кнопки "Previous" (возврат ко второму шагу)
    document.getElementById("cr-previous-step-btn").addEventListener("click", () => {
      // Прокручиваем к второму шагу
      document.querySelector(".cr-route-points").scrollIntoView({ behavior: "smooth" })
  
      // Активируем кнопку второго шага
      saveRouteBtn.classList.add("active")
      saveRouteBtn.classList.remove("disabled")
      saveRouteBtn.disabled = false
    })
  
    // Обработчик кнопки "Save and preview route"
    document.getElementById("cr-save-preview-btn").addEventListener("click", () => {
      // Проверяем, что все координаты подтверждены
      const allConfirmed = Array.from(document.querySelectorAll(".cr-confirm-btn")).every((btn) =>
        btn.classList.contains("disabled"),
      )
      if (!allConfirmed) {
        alert("Please confirm coordinates for all points before saving.")
        return
      }
  
      // Собираем координаты
      const pointsWithCoordinates = savedPoints.map((point, index) => {
        const coordinates = document.getElementById(`cr-coordinates-${index + 1}`).value
        return { ...point, coordinates }
      })
  
      console.log("Points with coordinates:", pointsWithCoordinates)
      alert("Route saved and ready for preview!")
    })
  })
  