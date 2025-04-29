import routesData from "./routesData.js"

// Проверка загрузки данных
console.log("Routes data loaded:", routesData)

const cardsGrid = document.getElementById("cardsGrid")

function createCard(route, index) {
  const card = document.createElement("div")
  card.className = "card"

  // Добавляем атрибуты для фильтрации и поиска
  card.setAttribute("data-type", route.type)
  card.setAttribute("data-location", route.location)
  card.setAttribute("data-name", route.name)

  // Извлекаем число из строки длительности (например, "3 часа" -> "3")
  const durationParts = route.duration.split(" ")
  card.setAttribute("data-duration", durationParts[0])

  // Определяем тип длительности (часы или сутки)
  const durationType = route.duration.includes("час") ? "часов" : "суток"
  card.setAttribute("data-duration-type", durationType)

  card.setAttribute("data-difficulty", route.difficulty)
  card.setAttribute("data-points", route.points)
  card.setAttribute("data-price", route.price || 0)
  card.setAttribute("data-subscription", route.subscription || false)

  // Добавляем описание для поиска, если оно есть
  if (route.description) {
    card.setAttribute("data-description", route.description)
  }

  // Добавляем достопримечательности для поиска, если они есть
  if (route.landmarks) {
    const landmarkNames = route.landmarks.map((landmark) => landmark.name).join(", ")
    card.setAttribute("data-landmarks", landmarkNames)
  }

  const cardImage = document.createElement("div")
  cardImage.className = "card-image"

  // Создаем изображения из галереи
  route.gallery.forEach((imgSrc, imgIndex) => {
    const img = document.createElement("img")
    img.src = imgSrc
    img.alt = route.name
    img.className = imgIndex === 0 ? "active" : ""
    cardImage.appendChild(img)
  })

  // Добавляем стрелки только если есть изображения
  if (route.gallery.length > 1) {
    const arrowLeft = document.createElement("button")
    arrowLeft.className = "arrow arrow-left"
    arrowLeft.innerHTML = '<i class="fas fa-chevron-left"></i>'
    const arrowRight = document.createElement("button")
    arrowRight.className = "arrow arrow-right"
    arrowRight.innerHTML = '<i class="fas fa-chevron-right"></i>'
    cardImage.appendChild(arrowLeft)
    cardImage.appendChild(arrowRight)

    // Логика переключения изображений
    let currentImageIndex = 0
    const images = cardImage.querySelectorAll("img")
    const totalImages = images.length

    function showImage(index) {
      images.forEach((img, i) => {
        img.className = i === index ? "active" : ""
      })
    }

    arrowLeft.addEventListener("click", (e) => {
      e.preventDefault()
      e.stopPropagation()
      currentImageIndex = (currentImageIndex - 1 + totalImages) % totalImages
      showImage(currentImageIndex)
    })

    arrowRight.addEventListener("click", (e) => {
      e.preventDefault()
      e.stopPropagation()
      currentImageIndex = (currentImageIndex + 1) % totalImages
      showImage(currentImageIndex)
    })
  }

  const cardContent = document.createElement("div")
  cardContent.className = "card-content"

  // Make the card content clickable
  const contentLink = document.createElement("a")
  contentLink.href = `route.html?route=${index}`
  contentLink.target = "_blank"
  contentLink.style.textDecoration = "none"
  contentLink.style.color = "inherit"
  contentLink.style.display = "block"
  contentLink.style.cursor = "pointer"

  contentLink.innerHTML = `
    <h2 class="card-title">${route.name}</h2>
    <div class="card-location">${route.location}</div>
    <div class="card-info">
      <div class="info-item">
        <div class="icon walking-icon"></div>
        <span>${route.type}</span>
      </div>
      <div class="info-item">
        <div class="icon time-icon"></div>
        <span>${route.duration}</span>
      </div>
      <div class="info-item">
        <div class="icon points-icon"></div>
        <span>${route.points} точек</span>
      </div>
      <div class="info-item">
        <div class="icon level-icon"></div>
        <span>${route.difficulty}</span>
      </div>
    </div>
    <div class="card-footer">
      <div class="price">free</div>
      <!-- <a class="details-button" href="route.html?route=${index}">Подробнее</a> -->
    </div>
  `

  cardContent.appendChild(contentLink)

  card.appendChild(cardImage)
  card.appendChild(cardContent)

  return card
}

// Генерируем карточки для всех маршрутов
routesData.forEach((route, index) => {
  const card = createCard(route, index)
  cardsGrid.appendChild(card)
})
