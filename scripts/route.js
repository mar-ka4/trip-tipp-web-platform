import routesData from "./routesData.js"
import usersData from "./usersData.js"

// Получаем индекс маршрута из URL
const urlParams = new URLSearchParams(window.location.search)
const routeIndex = Number.parseInt(urlParams.get("route")) || 0

// Проверяем, что маршрут существует
const route = routesData[routeIndex]
if (!route) {
  console.error("Route not found")
  document.getElementById("route-name").textContent = "Маршрут не найден"
  throw new Error("Invalid route index")
}

// Заполняем заголовок
document.getElementById("route-name").textContent = route.name
document.getElementById("route-location").textContent = route.location

// Находим автора маршрута и устанавливаем его аватар
if (route.author) {
  const creator = usersData.find(user => user.nickname === route.author)
  if (creator) {
    const creatorAvatar = document.querySelector('.creator-avatar img')
    if (creatorAvatar) {
      creatorAvatar.src = creator.avatar || "img/default-avatar.png"
      creatorAvatar.alt = `${creator.nickname}'s Avatar`
    }
  }
}

// Заполняем галерею (до 4 изображений: 2 больших, 2 маленьких)
const gallery = document.getElementById("route-gallery")
const placeholderLarge = "https://via.placeholder.com/300x600" // Портретная заглушка для теста
const placeholderSmall = "https://via.placeholder.com/150x300"
gallery.innerHTML = `
  <div class="gallery-item large-item">
    <img src="${route.gallery[0] || placeholderLarge}" alt="${route.name}">
  </div>
  <div class="gallery-item large-item">
    <img src="${route.gallery[1] || placeholderLarge}" alt="${route.name}">
  </div>
  <div class="gallery-item-small-container">
    <div class="gallery-item-small">
      <img src="${route.gallery[2] || placeholderSmall}" alt="${route.name}">
    </div>
    <div class="gallery-item-small">
      <img src="${route.gallery[3] || placeholderSmall}" alt="${route.name}">
    </div>
  </div>
`

// Логируем загрузку изображений для отладки
route.gallery.slice(0, 4).forEach((src, index) => {
  const img = new Image()
  img.src = src || (index < 2 ? placeholderLarge : placeholderSmall)
  img.onload = () => console.log(`Image ${src} loaded successfully`)
  img.onerror = () => console.error(`Failed to load image ${src}`)
})

// Заполняем обзор
document.getElementById("route-type").textContent = route.type
document.getElementById("route-points").textContent = route.points
document.getElementById("route-duration").textContent = route.duration
document.getElementById("route-difficulty").textContent = route.difficulty // Добавляем сложность

// Заполняем описание
document.getElementById("route-description").innerHTML = route.description
  .split(". ")
  .map((sentence) => `<p>${sentence.trim()}.</p>`)
  .join("")

// Заполняем карту
const mapImg = document.getElementById("route-map")
mapImg.src = route.previewMap || "https://via.placeholder.com/600x300"

// Заполняем достопримечательности из landmarks
const attractions = document.getElementById("route-attractions")

// Проверяем, есть ли landmarks в маршруте
if (route.landmarks && route.landmarks.length > 0) {
  // Создаем HTML для каждой достопримечательности
  const landmarksHTML = route.landmarks
    .map(
      (landmark) => `
    <div class="attraction-item">
      <div class="attraction-image">
        <img src="${landmark.image || "https://via.placeholder.com/60"}" alt="${landmark.name}">
      </div>
      <div class="attraction-name">${landmark.name}</div>
    </div>
  `,
    )
    .join("")

  attractions.innerHTML = landmarksHTML
} else {
  // Если landmarks пуст, показываем сообщение
  attractions.innerHTML = "<p>Информация о достопримечательностях отсутствует</p>"
}