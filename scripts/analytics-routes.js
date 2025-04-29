import routesData from "./routesData.js"

document.addEventListener("DOMContentLoaded", () => {
  // Получаем элементы фильтров и списка маршрутов
  const sortFilter = document.getElementById("routeSortFilter")
  const typeFilter = document.getElementById("routeTypeFilter")
  const routesList = document.getElementById("routeCardsList")
  const routesCount = document.getElementById("routesCount")

  // Получаем текущего пользователя из localStorage
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))

  // Фильтруем маршруты, принадлежащие текущему пользователю
  let userRoutes = []

  if (currentUser) {
    // Фильтруем маршруты по автору, соответствующему nickname текущего пользователя
    userRoutes = routesData.filter((route) => route.author === currentUser.nickname)

    // Если у пользователя нет маршрутов, показываем сообщение
    if (userRoutes.length === 0) {
      routesList.innerHTML = `
        <div class="no-routes-message">
          <p>У вас пока нет созданных маршрутов для аналитики.</p>
          <a href="create-route.html" class="create-route-link">Создать маршрут</a>
        </div>
      `
      // Скрываем фильтры, если нет маршрутов
      document.querySelector(".routes-filters").style.display = "none"
      return
    }
  } else {
    // Если пользователь не залогинен, показываем сообщение
    routesList.innerHTML = `
      <div class="no-routes-message">
        <p>Войдите в аккаунт, чтобы увидеть аналитику ваших маршрутов.</p>
        <a href="login.html" class="login-link">Войти</a>
      </div>
    `
    // Скрываем фильтры, если пользователь не залогинен
    document.querySelector(".routes-filters").style.display = "none"
    return
  }

  // Функция для создания карточки маршрута
  function createRouteCard(route) {
    // Форматируем дату создания
    const createdDate = new Date(route.createdAt)
    const formattedDate = createdDate.toLocaleDateString("ru-RU")

    // Создаем HTML для карточки маршрута
    const routeCard = document.createElement("div")
    routeCard.className = "route-card"
    routeCard.setAttribute("data-type", getRouteType(route.type))
    routeCard.setAttribute("data-revenue", route.totalRevenue)
    routeCard.setAttribute("data-date", route.createdAt)

    routeCard.innerHTML = `
      <div class="route-image">
        <img src="${route.gallery[0]}" alt="${route.name}">
      </div>
      <div class="route-details">
        <h3>${route.name}</h3>
        <p class="location">${route.location}</p>
        
        <div class="route-metrics">
          <div class="total-uses">
            <div class="metric-value">${route.totalUses}</div>
            <div class="metric-label">total uses</div>
          </div>
          
          <div class="sales-metrics">
            <div class="one-time-sales">
              <div class="metric-header">
                <span class="dot blue"></span>
                <span>one-time sales</span>
              </div>
              <div class="metric-value">${route.oneTimeRevenue.toFixed(2)}$</div>
            </div>
            
            <div class="subscription-sales">
              <div class="metric-header">
                <span class="dot green"></span>
                <span>subscription purchases</span>
              </div>
              <div class="metric-value">${route.subscriptionRevenue.toFixed(2)}$</div>
            </div>
          </div>
          
          <div class="route-time-filter">
            <button class="time-btn active" data-value="7d">7 d</button>
            <button class="time-btn" data-value="1m">1 m</button>
            <button class="time-btn" data-value="3m">3 m</button>
            <button class="time-btn" data-value="1y">1 y</button>
          </div>
        </div>
      </div>
    `

    return routeCard
  }

  // Функция для преобразования типа маршрута в формат для фильтрации
  function getRouteType(type) {
    const typeMap = {
      пеший: "walking",
      автодом: "car",
      поход: "hiking",
      велосипед: "bicycle",
    }
    return typeMap[type] || "walking"
  }

  // Функция для обновления счетчика маршрутов
  function updateRoutesCount() {
    const visibleRoutes = document.querySelectorAll('.route-card:not([style*="display: none"])').length
    const suffix = getRoutesCountSuffix(visibleRoutes)
    routesCount.textContent = `${visibleRoutes} ${suffix}`
  }

  // Функция для определения правильного окончания слова "маршрут"
  function getRoutesCountSuffix(count) {
    if (count === 1) {
      return "маршрут"
    } else if (count >= 2 && count <= 4) {
      return "маршрута"
    } else {
      return "маршрутов"
    }
  }

  // Функция для применения фильтров и сортировки
  function applyFilters() {
    const sortValue = sortFilter.value
    const typeValue = typeFilter.value

    // Получаем все карточки маршрутов
    const routeCards = Array.from(routesList.querySelectorAll(".route-card"))

    // Применяем фильтр по типу
    routeCards.forEach((card) => {
      const cardType = card.getAttribute("data-type")
      if (typeValue === "all" || cardType === typeValue) {
        card.style.display = ""
      } else {
        card.style.display = "none"
      }
    })

    // Получаем видимые карточки после фильтрации
    const visibleCards = routeCards.filter((card) => card.style.display !== "none")

    // Сортируем карточки
    visibleCards.sort((a, b) => {
      switch (sortValue) {
        case "popular":
          const usesA = Number.parseInt(a.querySelector(".total-uses .metric-value").textContent)
          const usesB = Number.parseInt(b.querySelector(".total-uses .metric-value").textContent)
          return usesB - usesA
        case "revenue":
          const revenueA = Number.parseFloat(a.getAttribute("data-revenue"))
          const revenueB = Number.parseFloat(b.getAttribute("data-revenue"))
          return revenueB - revenueA
        case "newest":
          const dateA = new Date(a.getAttribute("data-date"))
          const dateB = new Date(b.getAttribute("data-date"))
          return dateB - dateA
        case "oldest":
          const dateAOld = new Date(a.getAttribute("data-date"))
          const dateBOld = new Date(b.getAttribute("data-date"))
          return dateAOld - dateBOld
        default:
          return 0
      }
    })

    // Переупорядочиваем карточки в DOM
    visibleCards.forEach((card) => {
      routesList.appendChild(card)
    })

    // Обновляем счетчик маршрутов
    updateRoutesCount()
  }

  // Заполняем список маршрутов
  function populateRoutesList() {
    // Очищаем список
    routesList.innerHTML = ""

    // Добавляем карточки маршрутов пользователя
    userRoutes.forEach((route) => {
      const routeCard = createRouteCard(route)
      routesList.appendChild(routeCard)
    })

    // Применяем начальную сортировку и фильтрацию
    applyFilters()
  }

  // Добавляем обработчики событий для фильтров
  sortFilter.addEventListener("change", applyFilters)
  typeFilter.addEventListener("change", applyFilters)

  // Заполняем список маршрутов
  populateRoutesList()

  // Добавляем обработчики для кнопок временного фильтра
  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("time-btn")) {
      // Находим родительский элемент с кнопками фильтра
      const filterGroup = event.target.closest(".route-time-filter")

      // Убираем класс active у всех кнопок в этой группе
      filterGroup.querySelectorAll(".time-btn").forEach((btn) => {
        btn.classList.remove("active")
      })

      // Добавляем класс active к нажатой кнопке
      event.target.classList.add("active")

      // Здесь можно добавить логику для фильтрации данных по времени
      // Например, обновление данных о продажах и использовании для выбранного периода
    }
  })
})
