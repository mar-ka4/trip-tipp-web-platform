document.addEventListener("DOMContentLoaded", () => {
    // Получаем элемент кнопки переключения языка
    const languageButton = document.getElementById("languageButton")
    const languageCode = document.querySelector(".language-code")
  
    // Загружаем сохраненный язык из localStorage или используем язык по умолчанию
    const savedLanguage = localStorage.getItem("userLanguage") || "ru"
  
    // Устанавливаем код языка на кнопке
    languageCode.textContent = savedLanguage.toUpperCase()
  
    // Загружаем HTML-код языкового меню
    loadLanguageMenu()
  
    // Функция для загрузки HTML-кода языкового меню
    function loadLanguageMenu() {
      fetch("components/language-menu.html")
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
          }
          return response.text()
        })
        .then((html) => {
          // Вставляем HTML-код меню после кнопки
          const languageSwitcher = document.querySelector(".language-switcher")
          languageSwitcher.insertAdjacentHTML("beforeend", html)
  
          // После загрузки меню инициализируем его функциональность
          initLanguageMenu()
        })
        .catch((error) => {
          console.error("Ошибка загрузки языкового меню:", error)
        })
    }
  
    // Функция для инициализации функциональности языкового меню
    function initLanguageMenu() {
      const languageMenu = document.getElementById("languageMenu")
      const languageSearch = document.getElementById("languageSearch")
      const languageItems = document.querySelectorAll(".language-item")
  
      // Устанавливаем активный язык при загрузке страницы
      setActiveLanguage(savedLanguage)
  
      // Прокручиваем список к активному элементу
      scrollToActiveLanguage()
  
      // Открытие/закрытие меню языков при клике на кнопку
      languageButton.addEventListener("click", () => {
        languageMenu.classList.toggle("active")
  
        // Если меню открыто, фокусируемся на поле поиска и прокручиваем к активному языку
        if (languageMenu.classList.contains("active")) {
          languageSearch.focus()
          scrollToActiveLanguage()
        }
      })
  
      // Закрытие меню при клике вне его
      document.addEventListener("click", (event) => {
        if (!languageButton.contains(event.target) && !languageMenu.contains(event.target)) {
          languageMenu.classList.remove("active")
        }
      })
  
      // Обработка поиска языков
      languageSearch.addEventListener("input", () => {
        const searchTerm = languageSearch.value.toLowerCase()
  
        languageItems.forEach((item) => {
          const langName = item.getAttribute("data-name").toLowerCase()
          const langCode = item.getAttribute("data-lang").toLowerCase()
  
          if (langName.includes(searchTerm) || langCode.includes(searchTerm)) {
            item.style.display = "flex"
          } else {
            item.style.display = "none"
          }
        })
      })
  
      // Обработка выбора языка
      languageItems.forEach((item) => {
        item.addEventListener("click", () => {
          const langCode = item.getAttribute("data-lang")
          setActiveLanguage(langCode)
  
          // Закрываем меню после выбора языка
          languageMenu.classList.remove("active")
  
          // Обновляем интерфейс в соответствии с выбранным языком
          updateInterfaceLanguage(langCode)
        })
      })
    }
  
    // Функция для прокрутки к активному языку в списке
    function scrollToActiveLanguage() {
      setTimeout(() => {
        const activeItem = document.querySelector(".language-item.active")
        const languageList = document.querySelector(".language-list")
  
        if (activeItem && languageList) {
          // Прокручиваем список к активному элементу с анимацией
          activeItem.scrollIntoView({
            behavior: "smooth",
            block: "center",
          })
        }
      }, 100) // Небольшая задержка для гарантированного отображения меню
    }
  
    // Функция для установки активного языка
    function setActiveLanguage(langCode) {
      // Обновляем код языка на кнопке
      languageCode.textContent = langCode.toUpperCase()
  
      // Если меню уже загружено, обновляем активный класс
      const languageItems = document.querySelectorAll(".language-item")
      if (languageItems.length > 0) {
        languageItems.forEach((item) => {
          if (item.getAttribute("data-lang") === langCode) {
            item.classList.add("active")
          } else {
            item.classList.remove("active")
          }
        })
      }
  
      // Сохраняем выбранный язык в localStorage
      localStorage.setItem("userLanguage", langCode)
    }
  
    // Функция для обновления языка интерфейса
    function updateInterfaceLanguage(langCode) {
      // Здесь будет код для обновления текстов интерфейса
      // В реальном приложении здесь можно загрузить языковые файлы или вызвать API
  
      // Пример обновления текста поиска в зависимости от языка
      const searchPlaceholders = {
        ru: "Поиск языка...",
        en: "Search language...",
        de: "Sprache suchen...",
        fr: "Rechercher une langue...",
        es: "Buscar idioma...",
        it: "Cerca lingua...",
        zh: "搜索语言...",
        ja: "言語を検索...",
        // Добавим еще несколько языков для демонстрации
        pt: "Pesquisar idioma...",
        nl: "Taal zoeken...",
        pl: "Szukaj języka...",
        ar: "البحث عن لغة...",
        hi: "भाषा खोजें...",
      }
  
      const languageSearch = document.getElementById("languageSearch")
      if (languageSearch) {
        languageSearch.placeholder = searchPlaceholders[langCode] || searchPlaceholders.en
      }
  
      // Для демонстрации выводим сообщение в консоль
      console.log(`Язык интерфейса изменен на: ${langCode}`)
  
      // Здесь можно добавить событие, которое будут слушать другие компоненты
      const languageChangeEvent = new CustomEvent("languageChange", {
        detail: { language: langCode },
      })
      document.dispatchEvent(languageChangeEvent)
    }
  })
  