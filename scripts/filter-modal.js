document.addEventListener("DOMContentLoaded", () => {
  // Получаем элементы DOM
  const filterButton = document.querySelector(".filter-button");
  const filterOverlay = document.getElementById("filterOverlay");

  // Загружаем содержимое модального окна
  fetch("filter-modal.html")
    .then((response) => response.text())
    .then((html) => {
      filterOverlay.innerHTML = html;

      // После загрузки содержимого инициализируем обработчики событий
      initializeFilterModal();
    })
    .catch((error) => {
      console.error("Ошибка загрузки модального окна фильтров:", error);
    });

  function initializeFilterModal() {
    const closeFilterBtn = document.getElementById("closeFilterBtn");
    const clearFiltersBtn = document.getElementById("clearFiltersBtn");
    const applyFiltersBtn = document.getElementById("applyFiltersBtn");

    // Инициализация кнопок-фильтров
    initFilterButtons();

    // Инициализация слайдеров и полей ввода
    initRangeSliders();

    // Инициализация кнопок выбора типа длительности
    initDurationTypeButtons();

    // Открытие модального окна фильтров
    filterButton.addEventListener("click", () => {
      document.body.style.overflow = "hidden"; // Запрещаем прокрутку страницы
      filterOverlay.classList.add("active");
    });

    // Закрытие модального окна фильтров
    closeFilterBtn.addEventListener("click", closeFilterModal);

    // Закрытие при клике вне модального окна
    filterOverlay.addEventListener("click", (e) => {
      if (e.target === filterOverlay) {
        closeFilterModal();
      }
    });

    // Закрытие по клавише Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && filterOverlay.classList.contains("active")) {
        closeFilterModal();
      }
    });

    function closeFilterModal() {
      filterOverlay.classList.remove("active");
      document.body.style.overflow = ""; // Восстанавливаем прокрутку
    }

    // Очистка всех фильтров
    clearFiltersBtn.addEventListener("click", () => {
      // Сбрасываем кнопки-фильтры
      document.querySelectorAll(".filter-button-option").forEach((btn) => {
        btn.classList.remove("active");
        if (btn.dataset.value === "all") {
          btn.classList.add("active");
        }
      });

      // Сбрасываем слайдеры и поля ввода
      document.querySelectorAll(".range-slider").forEach((slider) => {
        const minSlider = slider.querySelector(".range-slider-min");
        const maxSlider = slider.querySelector(".range-slider-max");
        const minInput = slider.closest(".filter-section").querySelector(".range-input[id*='Min']");
        const maxInput = slider.closest(".filter-section").querySelector(".range-input[id*='Max']");
        const minValue = slider.closest(".filter-section").querySelector(".range-value-min");
        const maxValue = slider.closest(".filter-section").querySelector(".range-value-max");

        if (slider.closest(".duration-filter")) {
          const durationType = document.querySelector(".duration-type-button.active").dataset.type;
          if (durationType === "hours") {
            minSlider.min = 0;
            minSlider.max = 24;
            maxSlider.min = 0;
            maxSlider.max = 24;
            minSlider.value = 0;
            maxSlider.value = 24;
            if (minValue) minValue.textContent = "0";
            if (maxValue) maxValue.textContent = "24";
          } else {
            minSlider.min = 1;
            minSlider.max = 30;
            maxSlider.min = 1;
            maxSlider.max = 30;
            minSlider.value = 1;
            maxSlider.value = 30;
            if (minValue) minValue.textContent = "1";
            if (maxValue) maxValue.textContent = "30";
          }
        } else {
          minSlider.value = minSlider.min;
          maxSlider.value = maxSlider.max;
          if (minInput) minInput.value = minSlider.min;
          if (maxInput) maxInput.value = maxSlider.max;
        }

        updateSliderTrack(slider);
      });

      // Сбрасываем тип длительности
      document.querySelectorAll(".duration-type-button").forEach((btn, index) => {
        btn.classList.toggle("active", index === 0);
      });

      // Показываем все маршруты
      showAllRoutes();
    });

    // Применение фильтров
    applyFiltersBtn.addEventListener("click", () => {
      // Собираем значения фильтров
      const filters = {
        routeTypes: getSelectedFilterValues("filter-button-option", "тип маршрута"),
        difficulties: getSelectedFilterValues("filter-button-option", "сложность"),
        durationType: document.querySelector(".duration-type-button.active").dataset.type,
        durationRange: {
          min: parseInt(document.querySelector(".duration-filter .range-slider-min").value, 10),
          max: parseInt(document.querySelector(".duration-filter .range-slider-max").value, 10),
        },
        pointsRange: {
          min: parseInt(document.getElementById("pointsInputMin").value, 10),
          max: parseInt(document.getElementById("pointsInputMax").value, 10),
        },
        priceRange: {
          min: parseInt(document.getElementById("priceInputMin").value, 10),
          max: parseInt(document.getElementById("priceInputMax").value, 10),
        },
      };

      console.log("Применены фильтры:", filters);

      // Фильтруем маршруты
      filterRoutes(filters);

      // Закрываем модальное окно
      closeFilterModal();
    });
  }

  // Инициализация кнопок-фильтров
  function initFilterButtons() {
    const filterButtons = document.querySelectorAll(".filter-button-option");

    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const parentSection = button.closest(".filter-section");
        const buttonsInSection = parentSection.querySelectorAll(".filter-button-option");

        if (button.dataset.value === "all") {
          buttonsInSection.forEach((btn) => {
            btn.classList.toggle("active", btn === button);
          });
        } else {
          const allButton = parentSection.querySelector('.filter-button-option[data-value="all"]');
          if (allButton) {
            allButton.classList.remove("active");
          }

          button.classList.toggle("active");

          const activeButtons = parentSection.querySelectorAll(".filter-button-option.active");
          if (activeButtons.length === 0 && allButton) {
            allButton.classList.add("active");
          }
        }
      });
    });
  }

  // Инициализация слайдеров и полей ввода
  function initRangeSliders() {
    const rangeSliders = document.querySelectorAll(".range-slider");

    rangeSliders.forEach((slider) => {
      const minSlider = slider.querySelector(".range-slider-min");
      const maxSlider = slider.querySelector(".range-slider-max");
      const minInput = slider.closest(".filter-section").querySelector(".range-input[id*='Min']");
      const maxInput = slider.closest(".filter-section").querySelector(".range-input[id*='Max']");
      const minValue = slider.closest(".filter-section").querySelector(".range-value-min");
      const maxValue = slider.closest(".filter-section").querySelector(".range-value-max");

      if (minSlider && maxSlider) {
        // Устанавливаем начальные значения для полей ввода или текстовых значений
        if (minInput) minInput.value = minSlider.value;
        if (maxInput) maxInput.value = maxSlider.value;
        if (minValue) minValue.textContent = minSlider.value;
        if (maxValue) maxValue.textContent = maxSlider.value;
        updateSliderTrack(slider);

        // Обработчики событий для минимального ползунка
        minSlider.addEventListener("input", () => {
          const minVal = parseInt(minSlider.value, 10);
          const maxVal = parseInt(maxSlider.value, 10);

          if (minVal > maxVal) {
            minSlider.value = maxVal;
          }

          if (minInput) minInput.value = minSlider.value;
          if (minValue) minValue.textContent = minSlider.value;
          updateSliderTrack(slider);
        });

        // Обработчики событий для максимального ползунка
        maxSlider.addEventListener("input", () => {
          const minVal = parseInt(minSlider.value, 10);
          const maxVal = parseInt(maxSlider.value, 10);

          if (maxVal < minVal) {
            maxSlider.value = minVal;
          }

          if (maxInput) maxInput.value = maxSlider.value;
          if (maxValue) maxValue.textContent = maxSlider.value;
          updateSliderTrack(slider);
        });

        // Обработчики событий для поля ввода минимального значения
        if (minInput) {
          minInput.addEventListener("input", () => {
            let value = parseInt(minInput.value, 10);
            const min = parseInt(minInput.min, 10);
            const max = parseInt(minInput.max, 10);
            const maxVal = parseInt(maxInput.value, 10);

            // Ограничиваем значение
            if (isNaN(value) || value < min) {
              value = min;
            } else if (value > maxVal) {
              value = maxVal;
            } else if (value > max) {
              value = max;
            }

            minInput.value = value;
            minSlider.value = value;
            updateSliderTrack(slider);
          });
        }

        // Обработчики событий для поля ввода максимального значения
        if (maxInput) {
          maxInput.addEventListener("input", () => {
            let value = parseInt(maxInput.value, 10);
            const min = parseInt(maxInput.min, 10);
            const max = parseInt(maxInput.max, 10);
            const minVal = parseInt(minInput.value, 10);

            // Ограничиваем значение
            if (isNaN(value) || value > max) {
              value = max;
            } else if (value < minVal) {
              value = minVal;
            } else if (value < min) {
              value = min;
            }

            maxInput.value = value;
            maxSlider.value = value;
            updateSliderTrack(slider);
          });
        }
      }
    });
  }

  // Обновление визуального отображения слайдера
  function updateSliderTrack(slider) {
    const minSlider = slider.querySelector(".range-slider-min");
    const maxSlider = slider.querySelector(".range-slider-max");

    if (minSlider && maxSlider) {
      const min = parseInt(minSlider.min, 10);
      const max = parseInt(minSlider.max, 10);
      const minVal = parseInt(minSlider.value, 10);
      const maxVal = parseInt(maxSlider.value, 10);

      const minPercent = ((minVal - min) / (max - min)) * 100;
      const maxPercent = ((maxVal - min) / (max - min)) * 100;

      let activeTrack = slider.querySelector(".active-track");
      if (!activeTrack) {
        activeTrack = document.createElement("div");
        activeTrack.className = "active-track";
        activeTrack.style.position = "absolute";
        activeTrack.style.height = "4px";
        activeTrack.style.backgroundColor = "#8888c9";
        activeTrack.style.borderRadius = "4px";
        activeTrack.style.zIndex = "1";
        slider.appendChild(activeTrack);
      }

      activeTrack.style.left = minPercent + "%";
      activeTrack.style.width = (maxPercent - minPercent) + "%";
    }
  }

  // Инициализация кнопок выбора типа длительности
  function initDurationTypeButtons() {
    const durationButtons = document.querySelectorAll(".duration-type-button");
    const durationSlider = document.querySelector(".duration-filter .range-slider");
    const minSlider = durationSlider.querySelector(".range-slider-min");
    const maxSlider = durationSlider.querySelector(".range-slider-max");
    const minValue = durationSlider.closest(".filter-section").querySelector(".range-value-min");
    const maxValue = durationSlider.closest(".filter-section").querySelector(".range-value-max");

    durationButtons.forEach((button) => {
      button.addEventListener("click", () => {
        durationButtons.forEach((btn) => {
          btn.classList.remove("active");
        });
        button.classList.add("active");

        const type = button.dataset.type;
        if (type === "hours") {
          minSlider.min = 0;
          minSlider.max = 24;
          maxSlider.min = 0;
          maxSlider.max = 24;
          minSlider.value = 0;
          maxSlider.value = 24;
          minValue.textContent = "0";
          maxValue.textContent = "24";
        } else if (type === "days") {
          minSlider.min = 1;
          minSlider.max = 30;
          maxSlider.min = 1;
          maxSlider.max = 30;
          minSlider.value = 1;
          maxSlider.value = 30;
          minValue.textContent = "1";
          maxValue.textContent = "30";
        }

        updateSliderTrack(durationSlider);
      });
    });
  }

  // Получение выбранных значений фильтров
  function getSelectedFilterValues(buttonClass, sectionTitle) {
    const values = [];
    const sections = document.querySelectorAll(".filter-section");

    sections.forEach((section) => {
      const title = section.querySelector("h3");
      if (title && title.textContent.toLowerCase().includes(sectionTitle.toLowerCase())) {
        const activeButtons = section.querySelectorAll("." + buttonClass + ".active");

        activeButtons.forEach((button) => {
          if (button.dataset.value !== "all") {
            values.push(button.dataset.value.toLowerCase());
          }
        });
      }
    });

    return values;
  }

  // Функция для отображения всех маршрутов
  function showAllRoutes() {
    const routeCards = document.querySelectorAll(".card");
    routeCards.forEach((card) => {
      card.style.display = "";
    });
    console.log("Показаны все маршруты");

    hideNoResultsMessage();
  }

  // Функция для фильтрации маршрутов
  function filterRoutes(filters) {
    const routeCards = document.querySelectorAll(".card");
    let visibleCount = 0;

    routeCards.forEach((card) => {
      const routeType = card.getAttribute("data-type")?.toLowerCase();
      const routeDurationText = card.getAttribute("data-duration") || "";
      const routeDurationValue = parseInt(routeDurationText, 10) || 0;
      const routeDurationType = card.getAttribute("data-duration-type");
      const routeDifficulty = card.getAttribute("data-difficulty")?.toLowerCase();
      const routePoints = parseInt(card.getAttribute("data-points") || "0", 10);
      const routePrice = parseInt(card.getAttribute("data-price") || "0", 10);

      let isVisible = true;

      if (filters.routeTypes.length > 0 && !filters.routeTypes.includes(routeType)) {
        isVisible = false;
      }

      if (filters.difficulties.length > 0 && !filters.difficulties.includes(routeDifficulty)) {
        isVisible = false;
      }

      if (routePoints < filters.pointsRange.min || routePoints > filters.pointsRange.max) {
        isVisible = false;
      }

      if (routePrice < filters.priceRange.min || routePrice > filters.priceRange.max) {
        isVisible = false;
      }

      let routeDurationInHours;
      if (routeDurationType === "часов" || routeDurationType.includes("час")) {
        routeDurationInHours = routeDurationValue;
      } else if (routeDurationType === "суток" || routeDurationType.includes("дн")) {
        routeDurationInHours = routeDurationValue * 24;
      } else {
        routeDurationInHours = routeDurationValue;
      }

      let minDurationInHours, maxDurationInHours;
      if (filters.durationType === "hours") {
        minDurationInHours = filters.durationRange.min;
        maxDurationInHours = filters.durationRange.max;
      } else if (filters.durationType === "days") {
        minDurationInHours = filters.durationRange.min * 24;
        maxDurationInHours = filters.durationRange.max * 24;
      }

      if (routeDurationInHours < minDurationInHours || routeDurationInHours > maxDurationInHours) {
        isVisible = false;
      }

      if (isVisible) {
        card.style.display = "";
        visibleCount++;
      } else {
        card.style.display = "none";
      }
    });

    console.log(`Показано ${visibleCount} маршрутов после фильтрации`);

    if (visibleCount === 0) {
      showNoResultsMessage();
    } else {
      hideNoResultsMessage();
    }
  }

  // Функция для отображения сообщения "Нет результатов"
  function showNoResultsMessage() {
    let noResultsMsg = document.getElementById("noResultsMessage");

    if (!noResultsMsg) {
      noResultsMsg = document.createElement("div");
      noResultsMsg.id = "noResultsMessage";
      noResultsMsg.className = "no-results-message";
      noResultsMsg.innerHTML = `
        <div class="no-results-content">
          <h3>Маршруты не найдены</h3>
          <p>Попробуйте изменить параметры фильтрации</p>
        </div>
      `;

      const style = document.createElement("style");
      style.textContent = `
        .no-results-message {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          padding: 40px 20px;
          text-align: center;
          color: #fff;
        }
        .no-results-content {
          background-color: #292930;
          border-radius: 12px;
          padding: 30px;
          max-width: 400px;
        }
        .no-results-content h3 {
          font-size: 20px;
          margin-bottom: 10px;
        }
        .no-results-content p {
          color: #b0b3b8;
        }
      `;
      document.head.appendChild(style);

      const cardsGrid = document.getElementById("cardsGrid");
      cardsGrid.appendChild(noResultsMsg);
    } else {
      noResultsMsg.style.display = "flex";
    }
  }

  // Функция для скрытия сообщения "Нет результатов"
  function hideNoResultsMessage() {
    const noResultsMsg = document.getElementById("noResultsMessage");
    if (noResultsMsg) {
      noResultsMsg.style.display = "none";
    }
  }

  // Инициализация при загрузке страницы
  showAllRoutes();
});