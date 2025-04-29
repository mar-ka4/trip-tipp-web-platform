// Импортируем данные маршрутов
import routesData from "./routesData.js"

// Класс для реализации умного поиска
class SmartSearch {
  constructor() {
    // Инициализация поисковой системы
    this.initSearch()

    // Словарь синонимов для улучшения поиска
    this.synonyms = {
      // Типы маршрутов
      пеший: ["пешком", "прогулка", "пешая", "пешеходный", "ходьба", "walking", "walk", "foot"],
      автодом: ["машина", "авто", "автомобиль", "кемпер", "car", "camper", "rv", "автомобильный"],
      поход: ["треккинг", "трекинг", "hiking", "hike", "trek", "trekking", "горы"],
      велосипед: ["вело", "велосипедный", "велик", "bicycle", "bike", "cycling"],

      // Сложность
      легкая: ["легкий", "простой", "несложный", "easy", "simple", "начинающий"],
      средняя: ["средний", "medium", "normal", "обычный", "стандартный"],
      сложная: ["сложный", "трудный", "тяжелый", "hard", "difficult", "продвинутый", "экспертный"],

      // Города и страны
      берлин: ["berlin", "германия", "germany"],
      лондон: ["london", "великобритания", "англия", "uk", "england"],
      париж: ["paris", "франция", "france"],
      рим: ["rome", "италия", "italy"],
      токио: ["tokyo", "япония", "japan"],
      "нью-йорк": ["new york", "сша", "америка", "usa"],
      амстердам: ["amsterdam", "нидерланды", "голландия", "netherlands", "holland"],
      барселона: ["barcelona", "испания", "spain"],
      прага: ["prague", "чехия", "czech"],
      вена: ["vienna", "австрия", "austria"],
      стамбул: ["istanbul", "турция", "turkey"],
      копенгаген: ["copenhagen", "дания", "denmark"],
      эдинбург: ["edinburgh", "шотландия", "scotland"],
      лиссабон: ["lisbon", "португалия", "portugal"],
      флоренция: ["florence", "италия", "italy"],
      исландия: ["iceland", "рейкьявик", "reykjavik"],
      швейцария: ["switzerland", "альпы", "alps", "церматт", "zermatt"],

      // Достопримечательности
      достопримечательности: ["landmarks", "sights", "attractions", "places", "места", "интересные места"],
      исторический: ["historical", "historic", "history", "история", "исторические"],
      культурный: ["cultural", "culture", "культура"],
      природа: ["nature", "natural", "природный"],
      музей: ["museum", "музеи", "museums"],
      парк: ["park", "parks", "парки"],
      замок: ["castle", "замки", "castles", "palace", "дворец"],
      собор: ["cathedral", "church", "церковь", "храм"],
      мост: ["bridge", "bridges", "мосты"],
      площадь: ["square", "squares", "площади"],

      // Длительность
      час: ["часа", "часов", "hour", "hours"],
      день: ["дня", "дней", "day", "days"],
      неделя: ["недели", "недель", "week", "weeks"],
    }

    // Стоп-слова, которые можно игнорировать при поиске
    this.stopWords = [
      "и",
      "в",
      "на",
      "с",
      "по",
      "к",
      "у",
      "о",
      "от",
      "для",
      "the",
      "a",
      "an",
      "in",
      "on",
      "at",
      "to",
      "with",
      "by",
      "for",
      "of",
    ]
  }

  // Инициализация поисковой системы
  initSearch() {
    const searchBar = document.querySelector(".search-bar")
    const cardsGrid = document.getElementById("cardsGrid")

    if (!searchBar || !cardsGrid) {
      console.error("Не найдены необходимые элементы для поиска")
      return
    }

    // Обработчик события ввода в поисковую строку
    searchBar.addEventListener("input", (e) => {
      const query = e.target.value.trim()

      // Если запрос пустой, показываем все карточки
      if (!query) {
        this.showAllCards()
        return
      }

      // Выполняем поиск и фильтруем карточки
      const results = this.search(query)
      this.filterCards(results)
    })
  }

  // Показать все карточки
  showAllCards() {
    const cards = document.querySelectorAll(".card")
    cards.forEach((card) => {
      card.style.display = "block"
    })

    // Обновляем сообщение о результатах поиска
    this.updateSearchResults(cards.length)
  }

  // Обновление сообщения о результатах поиска
  updateSearchResults(count) {
    // Проверяем, существует ли элемент с результатами поиска
    let searchResults = document.getElementById("searchResults")

    // Если элемент не существует, создаем его
    if (!searchResults) {
      searchResults = document.createElement("div")
      searchResults.id = "searchResults"
      searchResults.className = "search-results"

      // Стили для блока результатов поиска
      searchResults.style.padding = "10px 15px"
      searchResults.style.marginBottom = "20px"
      searchResults.style.borderRadius = "8px"
      searchResults.style.backgroundColor = "rgba(107, 70, 193, 0.1)"
      searchResults.style.color = "#fff"
      searchResults.style.fontSize = "14px"

      // Вставляем перед контейнером карточек
      const cardsContainer = document.querySelector(".cards-container")
      cardsContainer.insertBefore(searchResults, cardsContainer.firstChild)
    }

    // Обновляем текст в зависимости от количества найденных маршрутов
    if (count === 0) {
      searchResults.textContent = "По вашему запросу ничего не найдено"
      searchResults.style.display = "block"
    } else {
      const routeWord = this.getRouteWordForm(count)
      searchResults.textContent = `Найдено: ${count} ${routeWord}`
      searchResults.style.display = "block"
    }
  }

  // Получение правильной формы слова "маршрут" в зависимости от числа
  getRouteWordForm(count) {
    const lastDigit = count % 10
    const lastTwoDigits = count % 100

    if (lastDigit === 1 && lastTwoDigits !== 11) {
      return "маршрут"
    } else if ([2, 3, 4].includes(lastDigit) && ![12, 13, 14].includes(lastTwoDigits)) {
      return "маршрута"
    } else {
      return "маршрутов"
    }
  }

  // Фильтрация карточек на основе результатов поиска
  filterCards(results) {
    const cards = document.querySelectorAll(".card")
    let visibleCount = 0

    cards.forEach((card, index) => {
      if (results.includes(index)) {
        card.style.display = "block"
        visibleCount++
      } else {
        card.style.display = "none"
      }
    })

    // Обновляем сообщение о результатах поиска
    this.updateSearchResults(visibleCount)
  }

  // Основная функция поиска
  search(query) {
    // Нормализуем запрос и разбиваем на ключевые слова
    const keywords = this.normalizeAndTokenize(query)

    // Если нет ключевых слов после нормализации, возвращаем все маршруты
    if (keywords.length === 0) {
      return routesData.map((_, index) => index)
    }

    // Расширяем ключевые слова синонимами
    const expandedKeywords = this.expandWithSynonyms(keywords)

    // Результаты поиска с рейтингом релевантности
    const results = routesData.map((route, index) => {
      const relevance = this.calculateRelevance(route, expandedKeywords)
      return { index, relevance }
    })

    // Фильтруем результаты с нулевой релевантностью и сортируем по убыванию релевантности
    return results
      .filter((result) => result.relevance > 0)
      .sort((a, b) => b.relevance - a.relevance)
      .map((result) => result.index)
  }

  // Нормализация текста и разбиение на токены
  normalizeAndTokenize(text) {
    // Приводим к нижнему регистру и удаляем лишние пробелы
    const normalized = text.toLowerCase().trim()

    // Разбиваем на слова
    const words = normalized.split(/\s+/)

    // Фильтруем стоп-слова
    return words.filter((word) => !this.stopWords.includes(word))
  }

  // Расширение ключевых слов синонимами
  expandWithSynonyms(keywords) {
    const expanded = new Set()

    // Добавляем исходные ключевые слова
    keywords.forEach((keyword) => expanded.add(keyword))

    // Добавляем синонимы
    keywords.forEach((keyword) => {
      // Проверяем, является ли слово ключом в словаре синонимов
      if (this.synonyms[keyword]) {
        this.synonyms[keyword].forEach((synonym) => expanded.add(synonym))
      }

      // Проверяем, является ли слово значением в словаре синонимов
      for (const [key, synonyms] of Object.entries(this.synonyms)) {
        if (synonyms.includes(keyword)) {
          expanded.add(key)
          synonyms.forEach((synonym) => expanded.add(synonym))
        }
      }
    })

    return Array.from(expanded)
  }

  // Расчет релевантности маршрута для запроса
  calculateRelevance(route, keywords) {
    let relevance = 0

    // Создаем текстовое представление маршрута для поиска
    const routeText = this.createRouteSearchText(route)

    // Нормализуем текст маршрута
    const normalizedRouteText = routeText.toLowerCase()

    // Проверяем каждое ключевое слово
    keywords.forEach((keyword) => {
      // Проверка на точное совпадение слова
      const regex = new RegExp(`\\b${keyword}\\b`, "i")

      // Название маршрута (высокий вес)
      if (route.name.toLowerCase().match(regex)) {
        relevance += 10
      }

      // Локация (высокий вес)
      if (route.location.toLowerCase().match(regex)) {
        relevance += 8
      }

      // Тип маршрута (средний вес)
      if (route.type.toLowerCase() === keyword) {
        relevance += 6
      }

      // Сложность (средний вес)
      if (route.difficulty.toLowerCase() === keyword) {
        relevance += 5
      }

      // Длительность (низкий вес)
      if (route.duration.toLowerCase().includes(keyword)) {
        relevance += 4
      }

      // Описание (низкий вес)
      if (route.description && route.description.toLowerCase().includes(keyword)) {
        relevance += 3
      }

      // Достопримечательности (низкий вес)
      if (route.landmarks) {
        const landmarkMatch = route.landmarks.some((landmark) => landmark.name.toLowerCase().includes(keyword))
        if (landmarkMatch) {
          relevance += 3
        }
      }

      // Общий текст маршрута (самый низкий вес)
      if (normalizedRouteText.includes(keyword)) {
        relevance += 1
      }
    })

    return relevance
  }

  // Создание текстового представления маршрута для поиска
  createRouteSearchText(route) {
    const textParts = [
      route.name,
      route.location,
      route.type,
      route.difficulty,
      route.duration,
      route.description || "",
    ]

    // Добавляем названия достопримечательностей, если они есть
    if (route.landmarks) {
      route.landmarks.forEach((landmark) => {
        textParts.push(landmark.name)
      })
    }

    return textParts.join(" ")
  }
}

// Инициализация поисковой системы при загрузке страницы
document.addEventListener("DOMContentLoaded", () => {
  new SmartSearch()
})

export default SmartSearch
