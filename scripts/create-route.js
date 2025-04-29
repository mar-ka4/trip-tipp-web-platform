document.addEventListener("DOMContentLoaded", () => {
  // Global state
  const state = {
    currentStep: 1,
    routeInfo: {
      name: "",
      difficulty: "",
      durationValue: "",
      durationUnit: "",
      type: "",
      description: "",
      images: [],
      autoDuration: false,
      requireSubscription: false,
      prices: {
        USD: "",
        EUR: "",
        CNY: "",
        UAH: "",
        RUB: "",
      },
    },
    points: [],
    pointsWithCoordinates: [],
  }

  // DOM Elements
  const steps = document.querySelectorAll(".route-step")
  const stepContents = document.querySelectorAll(".route-step-content")
  const routeInfoForm = document.getElementById("route-info-form")
  const addPhotoBtn = document.getElementById("add-photo-btn")
  const photoUpload = document.getElementById("photo-upload")
  const photoCells = document.querySelectorAll(".route-photo-cell")
  const difficultyBtns = document.querySelectorAll(".route-difficulty-btn")
  const durationUnitBtns = document.querySelectorAll(
    '.route-toggle-btn[data-value="hours"], .route-toggle-btn[data-value="days"]',
  )
  const routeTypeBtns = document.querySelectorAll(".route-type-btn")
  const addPointBtn = document.getElementById("add-point-btn")
  const pointsContainer = document.getElementById("points-container")
  const previousStep1Btn = document.getElementById("previous-step1-btn")
  const savePointsBtn = document.getElementById("save-points-btn")
  const previousStep2Btn = document.getElementById("previous-step2-btn")
  const savePreviewBtn = document.getElementById("save-preview-btn")
  const coordinatesPointsContainer = document.getElementById("coordinates-points-container")
  const currentPointName = document.getElementById("current-point-name")

  // Templates
  const pointCardTemplate = document.getElementById("point-card-template")
  const coordinateCardTemplate = document.getElementById("coordinate-card-template")

  // Initialize
  updateProgressSteps()

  // Event Listeners for Step 1
  routeInfoForm.addEventListener("submit", handleRouteInfoSubmit)
  addPhotoBtn.addEventListener("click", () => photoUpload.click())
  photoUpload.addEventListener("change", handlePhotoUpload)

  // Toggle buttons for Step 1
  difficultyBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      difficultyBtns.forEach((b) => b.classList.remove("active"))
      btn.classList.add("active")
      document.getElementById("difficulty-value").value = btn.dataset.value
    })
  })

  durationUnitBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      durationUnitBtns.forEach((b) => b.classList.remove("active"))
      btn.classList.add("active")
      document.getElementById("duration-unit-value").value = btn.dataset.value
    })
  })

  routeTypeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      routeTypeBtns.forEach((b) => b.classList.remove("active"))
      btn.classList.add("active")
      document.getElementById("route-type-value").value = btn.dataset.value
    })
  })

  // Event Listeners for Step 2
  addPointBtn.addEventListener("click", addNewPoint)
  previousStep1Btn.addEventListener("click", () => goToStep(1))
  savePointsBtn.addEventListener("click", handleSavePoints)

  // Event Listeners for Step 3
  previousStep2Btn.addEventListener("click", () => goToStep(2))
  savePreviewBtn.addEventListener("click", handleSavePreview)

  // Add event listeners for new toggle switches
  const autoDurationToggle = document.getElementById("auto-duration-toggle")
  const subscriptionToggle = document.getElementById("subscription-toggle")
  const durationValueInput = document.getElementById("duration-value")
  const durationUnitBtnsElements = document.querySelectorAll(
    '.route-toggle-btn[data-value="hours"], .route-toggle-btn[data-value="days"]',
  )

  if (autoDurationToggle) {
    autoDurationToggle.addEventListener("change", () => {
      // Disable duration inputs when auto is selected
      const isAuto = autoDurationToggle.checked
      durationValueInput.disabled = isAuto
      durationUnitBtnsElements.forEach((btn) => {
        btn.disabled = isAuto
        if (isAuto) {
          btn.classList.add("disabled")
        } else {
          btn.classList.remove("disabled")
        }
      })

      // Update state
      state.routeInfo.autoDuration = isAuto
    })
  }

  if (subscriptionToggle) {
    subscriptionToggle.addEventListener("change", () => {
      // Update state
      state.routeInfo.requireSubscription = subscriptionToggle.checked
    })
  }

  // Functions
  function updateProgressSteps() {
    steps.forEach((step, index) => {
      if (index + 1 <= state.currentStep) {
        step.classList.add("active")
      } else {
        step.classList.remove("active")
      }
    })

    stepContents.forEach((content, index) => {
      if (index + 1 === state.currentStep) {
        content.classList.remove("hidden")
      } else {
        content.classList.add("hidden")
      }
    })
  }

  function goToStep(step) {
    state.currentStep = step
    updateProgressSteps()
  }

  function handleRouteInfoSubmit(e) {
    e.preventDefault()

    // Collect form data
    state.routeInfo.name = document.getElementById("route-name").value
    state.routeInfo.difficulty = document.getElementById("difficulty-value").value
    state.routeInfo.durationValue = document.getElementById("duration-value").value
    state.routeInfo.durationUnit = document.getElementById("duration-unit-value").value
    state.routeInfo.type = document.getElementById("route-type-value").value
    state.routeInfo.description = document.getElementById("description").value
    state.routeInfo.autoDuration = document.getElementById("auto-duration-toggle")?.checked || false
    state.routeInfo.requireSubscription = document.getElementById("subscription-toggle")?.checked || false

    // Collect prices
    state.routeInfo.prices.USD = document.getElementById("price-usd").value
    state.routeInfo.prices.EUR = document.getElementById("price-eur").value
    state.routeInfo.prices.CNY = document.getElementById("price-cny").value
    state.routeInfo.prices.UAH = document.getElementById("price-uah").value
    state.routeInfo.prices.RUB = document.getElementById("price-rub").value

    // Validate required fields
    if (!state.routeInfo.name || !state.routeInfo.description) {
      alert("Please fill out all required fields")
      return
    }

    // Validate that route type is selected
    if (!state.routeInfo.type) {
      alert("Please select a route type")
      return
    }

    // Validate that difficulty is selected
    if (!state.routeInfo.difficulty) {
      alert("Please select a difficulty level")
      return
    }

    // Validate that duration is set if not automatic
    if (!state.routeInfo.autoDuration && (!state.routeInfo.durationValue || !state.routeInfo.durationUnit)) {
      alert("Please set a duration or enable automatic duration")
      return
    }

    // Go to step 2
    goToStep(2)

    // If no points exist, add the first one
    if (state.points.length === 0) {
      addNewPoint()
    }
  }

  function handlePhotoUpload(e) {
    const files = Array.from(e.target.files)
    if (files.length === 0) return

    // Find empty cells
    const emptyCells = document.querySelectorAll(".route-photo-cell.empty")

    // Process only as many files as we have empty slots (max 5)
    const filesToProcess = files.slice(0, Math.min(files.length, emptyCells.length))

    filesToProcess.forEach((file, index) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        // Add to state
        state.routeInfo.images.push({
          file,
          preview: e.target.result,
        })

        // Update UI - fill the empty cell
        const cell = emptyCells[index]
        cell.classList.remove("empty")
        cell.innerHTML = `
          <img src="${e.target.result}" alt="Route photo">
          <button type="button" class="route-remove-photo-btn">
            <i class="fas fa-times"></i>
          </button>
        `

        // Add event listener to remove button
        const removeBtn = cell.querySelector(".route-remove-photo-btn")
        if (removeBtn) {
          removeBtn.addEventListener("click", (event) => {
            event.stopPropagation()
            // Find the index of this image in the state
            const imageIndex = state.routeInfo.images.findIndex((img) => img.preview === e.target.result)
            if (imageIndex !== -1) {
              // Remove from state
              state.routeInfo.images.splice(imageIndex, 1)
            }
            // Clear the cell
            cell.innerHTML = ""
            cell.classList.add("empty")
          })
        }
      }
      reader.readAsDataURL(file)
    })
  }

  function addNewPoint() {
    const pointId = Date.now() // Unique ID for the point
    const pointIndex = state.points.length

    // Create new point in state
    state.points.push({
      id: pointId,
      name: "",
      description: "",
      images: [],
    })

    // Clone template
    const pointCard = pointCardTemplate.content.cloneNode(true)

    // Set point number
    pointCard.querySelector(".point-number").textContent = pointIndex + 1

    // Set up remove button
    const removeBtn = pointCard.querySelector(".route-remove-point-btn")
    removeBtn.addEventListener("click", () => removePoint(pointId))

    // Set up name input
    const nameInput = pointCard.querySelector(".point-name")
    nameInput.addEventListener("input", (e) => {
      const point = state.points.find((p) => p.id === pointId)
      if (point) point.name = e.target.value
    })

    // Set up description input
    const descInput = pointCard.querySelector(".point-description")
    descInput.addEventListener("input", (e) => {
      const point = state.points.find((p) => p.id === pointId)
      if (point) point.description = e.target.value
    })

    // Set up image upload
    const addImageBtn = pointCard.querySelector(".add-point-image-btn")
    const imageUpload = pointCard.querySelector(".point-image-upload")
    const imagesPreview = pointCard.querySelector(".route-point-images-preview")

    addImageBtn.addEventListener("click", () => imageUpload.click())

    imageUpload.addEventListener("change", (e) => {
      const files = Array.from(e.target.files)
      if (files.length === 0) return

      const point = state.points.find((p) => p.id === pointId)
      if (!point) return

      // Limit to 3 images per point
      const remainingSlots = 3 - point.images.length
      const filesToProcess = files.slice(0, remainingSlots)

      filesToProcess.forEach((file) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          // Add to state
          point.images.push({
            file,
            preview: e.target.result,
          })

          // Update UI
          updatePointImagesPreview(point, imagesPreview, addImageBtn)
        }
        reader.readAsDataURL(file)
      })
    })

    // Add to DOM
    pointsContainer.appendChild(pointCard)

    // Update save button state
    updateSavePointsButtonState()
  }

  function removePoint(pointId) {
    // Don't allow removing if only one point remains
    if (state.points.length <= 1) {
      alert("You need at least one point")
      return
    }

    // Remove from state
    const pointIndex = state.points.findIndex((p) => p.id === pointId)
    if (pointIndex !== -1) {
      state.points.splice(pointIndex, 1)
    }

    // Remove from DOM
    const pointCards = pointsContainer.querySelectorAll(".route-point-card")
    if (pointCards[pointIndex]) {
      pointCards[pointIndex].remove()
    }

    // Update point numbers
    updatePointNumbers()

    // Update save button state
    updateSavePointsButtonState()
  }

  function updatePointNumbers() {
    const pointCards = pointsContainer.querySelectorAll(".route-point-card")
    pointCards.forEach((card, index) => {
      card.querySelector(".point-number").textContent = index + 1
    })
  }

  function updatePointImagesPreview(point, previewContainer, addButton) {
    previewContainer.innerHTML = ""

    point.images.forEach((image, index) => {
      const imagePreview = document.createElement("div")
      imagePreview.className = "route-point-image-preview"

      const img = document.createElement("img")
      img.src = image.preview
      img.alt = `Point Image ${index}`

      const removeBtn = document.createElement("button")
      removeBtn.className = "route-remove-point-image-btn"
      removeBtn.innerHTML = '<i class="fas fa-times"></i>'
      removeBtn.addEventListener("click", (e) => {
        e.stopPropagation()
        point.images.splice(index, 1)
        updatePointImagesPreview(point, previewContainer, addButton)
      })

      imagePreview.appendChild(img)
      imagePreview.appendChild(removeBtn)
      previewContainer.appendChild(imagePreview)
    })

    // Hide add button if max images reached
    addButton.style.display = point.images.length >= 3 ? "none" : "flex"
  }

  function updateSavePointsButtonState() {
    savePointsBtn.disabled = state.points.length < 5
    if (state.points.length < 5) {
      savePointsBtn.classList.add("disabled")
    } else {
      savePointsBtn.classList.remove("disabled")
    }
  }

  function handleSavePoints() {
    // Check if we have at least 5 points
    if (state.points.length < 5) {
      alert("Please add at least 5 points to your route")
      return
    }

    // Validate all points have name and description
    const isValid = state.points.every((point) => point.name.trim().length >= 3 && point.description.trim().length > 0)

    if (!isValid) {
      alert("Please fill out all point details (name must be at least 3 characters)")
      return
    }

    // Initialize points with coordinates
    state.pointsWithCoordinates = state.points.map((point) => ({
      ...point,
      coordinates: "",
      confirmed: false,
    }))

    // Go to step 3
    goToStep(3)

    // Load coordinate cards
    loadCoordinateCards()
  }

  function loadCoordinateCards() {
    coordinatesPointsContainer.innerHTML = ""

    state.pointsWithCoordinates.forEach((point, index) => {
      // Clone template
      const card = coordinateCardTemplate.content.cloneNode(true)

      // Set point number and name
      card.querySelector(".coordinate-point-number").textContent = index + 1
      card.querySelector(".route-point-name-label").textContent = point.name

      // Set point image if available
      const imageContainer = card.querySelector(".route-point-image-container")
      if (point.images && point.images.length > 0) {
        imageContainer.innerHTML = ""
        const img = document.createElement("img")
        img.src = point.images[0].preview
        img.alt = point.name
        img.style.width = "100%"
        img.style.height = "100%"
        img.style.objectFit = "cover"
        imageContainer.appendChild(img)
      }

      // Set up coordinate input
      const coordinateInput = card.querySelector(".route-coordinate-input")
      coordinateInput.value = point.coordinates
      coordinateInput.disabled = point.confirmed

      // Set up confirm button
      const confirmBtn = card.querySelector(".route-confirm-btn")
      confirmBtn.disabled = point.confirmed
      if (point.confirmed) {
        confirmBtn.style.opacity = "0.5"
        confirmBtn.style.cursor = "not-allowed"
      }

      confirmBtn.addEventListener("click", (e) => {
        e.stopPropagation()
        confirmCoordinates(index)
      })

      // Set up reset button
      const resetBtn = card.querySelector(".route-reset-btn")
      resetBtn.disabled = !point.confirmed
      resetBtn.addEventListener("click", (e) => {
        e.stopPropagation()
        resetCoordinates(index)
      })

      const cardElement = card.querySelector(".route-coordinate-card")
      if (point.confirmed) {
        cardElement.classList.add("confirmed")
      }

      // Set active class for first card
      if (index === 0) {
        cardElement.classList.add("active")
        currentPointName.textContent = point.name
      }

      // Add click handler to select card
      cardElement.addEventListener("click", () => {
        // Remove active class from all cards
        const cards = coordinatesPointsContainer.querySelectorAll(".route-coordinate-card")
        cards.forEach((c) => c.classList.remove("active"))

        // Add active class to clicked card
        cardElement.classList.add("active")

        // Update current point name in map
        currentPointName.textContent = point.name
      })

      // Add to container
      coordinatesPointsContainer.appendChild(card)
    })

    // Update save button state
    updateSavePreviewButtonState()
  }

  function confirmCoordinates(index) {
    const coordinates = document.querySelectorAll(".route-coordinate-input")[index].value

    if (!coordinates.trim()) {
      alert("Please enter coordinates before confirming")
      return
    }

    // Update state
    state.pointsWithCoordinates[index].coordinates = coordinates
    state.pointsWithCoordinates[index].confirmed = true

    // Update UI
    loadCoordinateCards()

    // Select next card if available
    if (index < state.pointsWithCoordinates.length - 1) {
      const nextCard = coordinatesPointsContainer.querySelectorAll(".route-coordinate-card")[index + 1]
      if (nextCard) {
        // Remove active class from all cards
        const cards = coordinatesPointsContainer.querySelectorAll(".route-coordinate-card")
        cards.forEach((c) => c.classList.remove("active"))

        // Add active class to next card
        nextCard.classList.add("active")

        // Update current point name in map
        currentPointName.textContent = state.pointsWithCoordinates[index + 1].name
      }
    }

    // Update save button state
    updateSavePreviewButtonState()
  }

  function resetCoordinates(index) {
    // Update state
    state.pointsWithCoordinates[index].coordinates = ""
    state.pointsWithCoordinates[index].confirmed = false

    // Update UI
    loadCoordinateCards()

    // Update save button state
    updateSavePreviewButtonState()
  }

  function updateSavePreviewButtonState() {
    const allConfirmed = state.pointsWithCoordinates.every((point) => point.confirmed)
    savePreviewBtn.disabled = !allConfirmed

    if (!allConfirmed) {
      savePreviewBtn.classList.add("disabled")
    } else {
      savePreviewBtn.classList.remove("disabled")
    }
  }

  function handleSavePreview() {
    // Check if all points have confirmed coordinates
    const allConfirmed = state.pointsWithCoordinates.every((point) => point.confirmed)

    if (!allConfirmed) {
      alert("Please confirm coordinates for all points before saving")
      return
    }

    // Here you would save the route data
    console.log("Route Info:", state.routeInfo)
    console.log("Points with coordinates:", state.pointsWithCoordinates)

    alert("Route saved and ready for preview!")
  }

  // Add first point if needed
  if (state.points.length === 0 && state.currentStep === 2) {
    addNewPoint()
  }
})
