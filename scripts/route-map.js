document.addEventListener("DOMContentLoaded", () => {
  // Инициализация галереи для каждой точки маршрута
  initPointGalleries()

  // Инициализация разворачивания текста
  initExpandableDescriptions()

  // Обработка клика по карточке точки маршрута
  const routePointCards = document.querySelectorAll(".route-point-card")

  routePointCards.forEach((card) => {
    card.addEventListener("click", function (e) {
      // Проверяем, не кликнули ли мы по кнопке галереи или кнопке "Показать больше"
      if (e.target.closest(".gallery-nav") || e.target.closest(".expand-button")) {
        return // Не активируем карточку если клик был по элементам управления
      }

      // Удаляем активный класс у всех карточек
      routePointCards.forEach((c) => c.classList.remove("active"))

      // Добавляем активный класс к выбранной карточке
      this.classList.add("active")

      // Получаем номер точки
      const pointNumber = this.querySelector(".point-number").textContent

      // Здесь будет код для центрирования карты на выбранной точке
      console.log(`Выбрана точка маршрута #${pointNumber}`)

      // Имитация перемещения к точке на карте
      const mapPlaceholder = document.querySelector(".map-placeholder")
      const mapMessage = document.querySelector(".map-message p")

      // Обновляем сообщение на карте
      mapMessage.textContent = `Точка #${pointNumber} выбрана. Здесь будет интерактивная карта.`

      // Анимация выбора точки
      mapPlaceholder.style.transition = "background-color 0.3s"
      mapPlaceholder.style.backgroundColor = "#1e1e1e"

      setTimeout(() => {
        mapPlaceholder.style.backgroundColor = "#1a1a1a"
      }, 300)
    })
  })

  // Обработка изменения темы карты
  const themeRadios = document.querySelectorAll('input[name="map-theme"]')

  themeRadios.forEach((radio) => {
    radio.addEventListener("change", function () {
      const mapPlaceholder = document.querySelector(".map-placeholder")

      // Меняем цвет фона в зависимости от выбранной темы
      switch (this.value) {
        case "light":
          mapPlaceholder.style.backgroundColor = "#e0e0e0"
          break
        case "dark":
          mapPlaceholder.style.backgroundColor = "#1a1a1a"
          break
        case "satellite":
          mapPlaceholder.style.backgroundColor = "#263238"
          break
      }

      console.log(`Выбрана тема карты: ${this.value}`)
    })
  })

  // Обработка изменения языка
  const languageRadios = document.querySelectorAll('input[name="language"]')

  languageRadios.forEach((radio) => {
    radio.addEventListener("change", function () {
      console.log(`Выбран язык: ${this.value}`)
      // Здесь будет код для перевода контента
    })
  })

  // Обработка настроек отображения маршрута
  const routeCheckboxes = document.querySelectorAll("#show-route, #show-points, #show-distances")

  routeCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      console.log(`${this.id}: ${this.checked ? "включено" : "выключено"}`)
      // Здесь будет код для изменения отображения маршрута
    })
  })

  // Обработка кнопок в дополнительном меню
  const dropdownButtons = document.querySelectorAll(".dropdown-button")

  dropdownButtons.forEach((button) => {
    button.addEventListener("click", function () {
      console.log(`Нажата кнопка: ${this.textContent}`)
      // Здесь будет код для обработки действий кнопок
    })
  })

  // Функция для закрытия выпадающих меню при клике вне их области
  document.addEventListener("click", (event) => {
    const isClickInsideSettings = event.target.closest(".settings-group")

    if (!isClickInsideSettings) {
      const openDropdowns = document.querySelectorAll(".settings-dropdown")
      openDropdowns.forEach((dropdown) => {
        dropdown.style.display = "none"
      })
    }
  })

  // Предотвращаем закрытие выпадающего меню при клике внутри него
  const settingsDropdowns = document.querySelectorAll(".settings-dropdown")

  settingsDropdowns.forEach((dropdown) => {
    dropdown.addEventListener("click", (event) => {
      event.stopPropagation()
    })
  })

  // Функция для инициализации галерей
  function initPointGalleries() {
    const galleries = document.querySelectorAll(".point-gallery")

    galleries.forEach((gallery) => {
      const images = gallery.querySelectorAll(".gallery-image")
      const prevBtn = gallery.querySelector(".gallery-prev")
      const nextBtn = gallery.querySelector(".gallery-next")
      let currentIndex = 0

      // Показываем стрелки навигации только если есть более одного изображения
      if (images.length <= 1) {
        if (prevBtn) prevBtn.style.display = "none"
        if (nextBtn) nextBtn.style.display = "none"
        return
      }

      // Функция для показа изображения по индексу
      function showImage(index) {
        // Скрыть все изображения
        images.forEach((img) => img.classList.remove("active"))
        // Показать выбранное изображение
        images[index].classList.add("active")
        currentIndex = index
      }

      // Обработчики событий для кнопок навигации
      if (prevBtn) {
        prevBtn.addEventListener("click", (e) => {
          e.stopPropagation() // Предотвращаем всплытие события
          let newIndex = currentIndex - 1
          if (newIndex < 0) newIndex = images.length - 1
          showImage(newIndex)
        })
      }

      if (nextBtn) {
        nextBtn.addEventListener("click", (e) => {
          e.stopPropagation() // Предотвращаем всплытие события
          let newIndex = currentIndex + 1
          if (newIndex >= images.length) newIndex = 0
          showImage(newIndex)
        })
      }
    })
  }

  // Функция для инициализации разворачивания текста
  function initExpandableDescriptions() {
    const expandButtons = document.querySelectorAll(".expand-button")

    expandButtons.forEach((button) => {
      const description = button.previousElementSibling.querySelector(".point-description")

      button.addEventListener("click", (e) => {
        e.stopPropagation() // Предотвращаем всплытие события

        if (description.classList.contains("collapsed")) {
          description.classList.remove("collapsed")
          button.textContent = "Показать меньше"
        } else {
          description.classList.add("collapsed")
          button.textContent = "Показать больше"
        }
      })
    })
  }

  // Инициализация: выбираем первую точку маршрута
  if (routePointCards.length > 0) {
    routePointCards[0].classList.add("active")
  }
})
