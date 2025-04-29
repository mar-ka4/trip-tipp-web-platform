import routesData from "./routesData.js"

document.addEventListener("DOMContentLoaded", () => {
  // Get current user from localStorage
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))

  // If no user is logged in, redirect to login page
  if (!currentUser) {
    window.location.href = "login.html"
    return
  }

  // Filter routes by current user
  const userRoutes = routesData.filter((route) => route.author === currentUser.nickname)

  // Update stats
  updateRouteStats(userRoutes)

  // Populate routes list
  populateRoutesList(userRoutes)

  // Set up event listeners
  setupEventListeners()
})

// Update route statistics
function updateRouteStats(routes) {
  document.getElementById("totalRoutes").textContent = routes.length

  // For demo purposes, we'll assume all routes are published
  // In a real app, you would check the status of each route
  const publishedCount = routes.length
  const draftCount = 0

  document.getElementById("publishedRoutes").textContent = publishedCount
  document.getElementById("draftRoutes").textContent = draftCount

  // Calculate total views (using totalUses as a proxy for views)
  const totalViews = routes.reduce((sum, route) => sum + (route.totalUses || 0), 0)
  document.getElementById("totalViews").textContent = totalViews
}

// Populate routes list
function populateRoutesList(routes) {
  const routesList = document.getElementById("routesList")

  // Clear existing content
  routesList.innerHTML = ""

  if (routes.length === 0) {
    // Show message if no routes
    routesList.innerHTML = `
      <div class="no-routes-message">
        <i class="fas fa-route"></i>
        <h3>No routes found</h3>
        <p>You haven't created any routes yet. Start creating your first route now!</p>
        <a href="create-route.html" class="create-route-button">
          <i class="fas fa-plus"></i> Create New Route
        </a>
      </div>
    `
    return
  }

  // Create route cards
  routes.forEach((route, index) => {
    const routeCard = createRouteCard(route, index)
    routesList.appendChild(routeCard)
  })
}

// Create a route card element
function createRouteCard(route, index) {
  const routeCard = document.createElement("div")
  routeCard.className = "route-card"
  routeCard.dataset.routeId = index

  // Format date
  const createdDate = new Date(route.createdAt)
  const formattedDate = createdDate.toLocaleDateString("ru-RU")

  // Determine route status (for demo, all are published)
  const routeStatus = "published"

  routeCard.innerHTML = `
    <div class="route-header">
      <h3 class="route-title">${route.name}</h3>
      <div class="route-actions">
        <button class="route-edit-btn" data-route-id="${index}">
          <i class="fas fa-edit"></i>
        </button>
        <button class="route-delete-btn" data-route-id="${index}">
          <i class="fas fa-trash-alt"></i>
        </button>
      </div>
    </div>
    <div class="route-content">
      <div class="route-image">
        <img src="${route.gallery[0]}" alt="${route.name}">
      </div>
      <div class="route-details">
        <div class="route-meta">
          <div class="meta-item">
            <i class="fas fa-map-marker-alt"></i>
            <span>${route.location}</span>
          </div>
          <div class="meta-item">
            <i class="fas fa-walking"></i>
            <span>${route.type}</span>
          </div>
          <div class="meta-item">
            <i class="fas fa-clock"></i>
            <span>${route.duration}</span>
          </div>
          <div class="meta-item">
            <i class="fas fa-signal"></i>
            <span>${route.difficulty}</span>
          </div>
          <div class="meta-item">
            <i class="fas fa-calendar-alt"></i>
            <span>Created: ${formattedDate}</span>
          </div>
          <div class="meta-item">
            <span class="route-status status-${routeStatus}">${routeStatus}</span>
          </div>
        </div>
        <div class="route-description">${route.description}</div>
        <div class="route-stats">
          <div class="route-stat">
            <i class="fas fa-eye"></i>
            <span>${route.totalUses || 0} views</span>
          </div>
          <div class="route-stat">
            <i class="fas fa-dollar-sign"></i>
            <span>${route.totalRevenue ? route.totalRevenue.toFixed(2) : "0.00"}$ revenue</span>
          </div>
          <div class="route-stat">
            <i class="fas fa-map-pin"></i>
            <span>${route.points} points</span>
          </div>
        </div>
      </div>
    </div>
  `

  return routeCard
}

// Set up event listeners
function setupEventListeners() {
  // Filter change event
  document.getElementById("sortFilter").addEventListener("change", applyFilters)
  document.getElementById("typeFilter").addEventListener("change", applyFilters)
  document.getElementById("statusFilter").addEventListener("change", applyFilters)

  // Search input event
  document.getElementById("routeSearch").addEventListener("input", applyFilters)

  // Route edit buttons
  document.addEventListener("click", (event) => {
    if (event.target.closest(".route-edit-btn")) {
      const routeId = event.target.closest(".route-edit-btn").dataset.routeId
      openEditModal(routeId)
    }
  })

  // Route delete buttons
  document.addEventListener("click", (event) => {
    if (event.target.closest(".route-delete-btn")) {
      const routeId = event.target.closest(".route-delete-btn").dataset.routeId
      openDeleteModal(routeId)
    }
  })

  // Close modal buttons - more specific handling
  document.querySelectorAll(".close-modal, .cancel-button").forEach((button) => {
    button.addEventListener("click", (event) => {
      // Get the parent modal of the clicked button
      const modal = event.target.closest(".modal")

      // If this is the field edit modal, only close that one
      if (modal.id === "fieldEditModal" || modal.id === "deleteConfirmModal") {
        closeModal(modal)
      } else {
        // For the main edit modal, close all modals
        closeAllModals()
      }
    })
  })

  // Edit field buttons
  document.addEventListener("click", (event) => {
    if (event.target.closest(".edit-button")) {
      const fieldName = event.target.closest(".edit-button").dataset.field
      openFieldEditModal(fieldName)
    }
  })

  // Point edit buttons
  document.addEventListener("click", (event) => {
    if (event.target.closest(".point-edit-btn")) {
      const pointIndex = event.target.closest(".point-edit-btn").dataset.index
      openPointEditModal(pointIndex)
    }
  })

  // Save field button
  document.querySelector(".save-field-button").addEventListener("click", saveFieldEdit)

  // Save route changes button
  document.querySelector(".save-button").addEventListener("click", saveRouteChanges)

  // Delete route button
  document.querySelector(".delete-button").addEventListener("click", deleteRoute)

  // Add image button
  document.querySelector(".add-image-button").addEventListener("click", addNewImage)

  // Add point button
  document.querySelector(".add-point-button").addEventListener("click", addNewPoint)

  // Point gallery navigation
  document.addEventListener("click", (event) => {
    if (event.target.closest(".point-gallery-prev")) {
      navigatePointGallery("prev")
    } else if (event.target.closest(".point-gallery-next")) {
      navigatePointGallery("next")
    }
  })

  // Add image to point gallery
  document.addEventListener("click", (event) => {
    if (event.target.closest(".add-point-image-btn")) {
      addImageToPointGallery()
    }
  })
}

// Replace the navigatePointGallery function with this corrected version
// Remove the navigatePointGallery function as it's no longer needed

// Add image to point gallery
function addImageToPointGallery() {
  const gallery = document.querySelector(".point-gallery-scroll")
  if (!gallery) return

  // Create new image element
  const newImage = document.createElement("div")
  newImage.className = "point-gallery-item"
  newImage.innerHTML = `
    <img src="/placeholder-image.jpg" alt="New point image">
    <button class="point-gallery-image-delete" title="Delete image">
      <i class="fas fa-trash-alt"></i>
    </button>
  `

  // Add to gallery before the add button
  const addButton = gallery.querySelector(".point-gallery-add-item")
  gallery.insertBefore(newImage, addButton)

  // Add delete event listener
  newImage.querySelector(".point-gallery-image-delete").addEventListener("click", (e) => {
    e.stopPropagation()
    const images = gallery.querySelectorAll(".point-gallery-item:not(.point-gallery-add-item)")

    // Don't delete if it's the only image
    if (images.length <= 1) return

    // Remove the image
    newImage.remove()
  })
}

// Apply filters to routes
function applyFilters() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))
  if (!currentUser) return

  // Get all user routes
  let userRoutes = routesData.filter((route) => route.author === currentUser.nickname)

  // Get filter values
  const sortValue = document.getElementById("sortFilter").value
  const typeValue = document.getElementById("typeFilter").value
  const statusValue = document.getElementById("statusFilter").value
  const searchValue = document.getElementById("routeSearch").value.toLowerCase()

  // Apply search filter
  if (searchValue) {
    userRoutes = userRoutes.filter(
      (route) =>
        route.name.toLowerCase().includes(searchValue) ||
        route.description.toLowerCase().includes(searchValue) ||
        route.location.toLowerCase().includes(searchValue),
    )
  }

  // Apply type filter
  if (typeValue !== "all") {
    const typeMap = {
      walking: "пеший",
      car: "автодом",
      bicycle: "велосипед",
      hiking: "поход",
    }
    userRoutes = userRoutes.filter((route) => route.type === typeMap[typeValue])
  }

  // Apply status filter (for demo, all routes are published)
  if (statusValue !== "all" && statusValue !== "published") {
    userRoutes = []
  }

  // Apply sort
  switch (sortValue) {
    case "newest":
      userRoutes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      break
    case "oldest":
      userRoutes.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      break
    case "popular":
      userRoutes.sort((a, b) => (b.totalUses || 0) - (a.totalUses || 0))
      break
    case "revenue":
      userRoutes.sort((a, b) => (b.totalRevenue || 0) - (a.totalRevenue || 0))
      break
  }

  // Update the routes list
  populateRoutesList(userRoutes)
}

// Open edit modal
function openEditModal(routeId) {
  const route = routesData[routeId]
  if (!route) return

  // Populate modal with route data
  document.getElementById("routeName").textContent = route.name
  document.getElementById("routeLocation").textContent = route.location
  document.getElementById("routeType").textContent = route.type
  document.getElementById("routeDifficulty").textContent = route.difficulty
  document.getElementById("routeDuration").textContent = route.duration
  document.getElementById("routePoints").textContent = route.points
  document.getElementById("routeDescription").textContent = route.description
  document.getElementById("routeStatus").textContent = "Published"
  document.getElementById("routeVisibility").textContent = "Public"
  document.getElementById("routePrice").textContent = "Free"
  document.getElementById("previewMap").src = route.previewMap

  // Populate gallery
  const galleryGrid = document.getElementById("routeGallery")
  galleryGrid.innerHTML = ""

  route.gallery.forEach((image, index) => {
    const galleryItem = document.createElement("div")
    galleryItem.className = "gallery-item"
    galleryItem.innerHTML = `
      <img src="${image}" alt="Gallery image ${index + 1}">
      <div class="gallery-actions">
        <button class="gallery-edit-btn" data-index="${index}">
          <i class="fas fa-pencil-alt"></i>
        </button>
        <button class="gallery-delete-btn" data-index="${index}">
          <i class="fas fa-trash-alt"></i>
        </button>
      </div>
    `
    galleryGrid.appendChild(galleryItem)
  })

  // Populate route points
  const pointsList = document.getElementById("routePointsList")
  pointsList.innerHTML = ""

  if (route.landmarks) {
    route.landmarks.forEach((landmark, index) => {
      const pointItem = document.createElement("div")
      pointItem.className = "route-point-item"
      pointItem.innerHTML = `
        <div class="point-number">${index + 1}</div>
        <div class="point-image">
          <img src="${landmark.image}" alt="${landmark.name}">
        </div>
        <div class="point-info">
          <div class="point-name">${landmark.name}</div>
          <div class="point-description">Point description goes here...</div>
        </div>
        <div class="point-actions">
          <button class="point-edit-btn" data-index="${index}">
            <i class="fas fa-pencil-alt"></i>
          </button>
          <button class="point-delete-btn" data-index="${index}">
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
      `
      pointsList.appendChild(pointItem)
    })
  }

  // Store the route ID in the modal for reference
  document.getElementById("editRouteModal").dataset.routeId = routeId

  // Show the modal
  document.getElementById("editRouteModal").style.display = "block"
}

// Open delete confirmation modal
function openDeleteModal(routeId) {
  const route = routesData[routeId]
  if (!route) return

  // Set route name in the modal
  document.getElementById("deleteRouteName").textContent = route.name

  // Store the route ID in the modal for reference
  document.getElementById("deleteConfirmModal").dataset.routeId = routeId

  // Show the modal
  document.getElementById("deleteConfirmModal").style.display = "block"
}

// Open field edit modal
function openFieldEditModal(fieldName) {
  const editModal = document.getElementById("editRouteModal")
  const routeId = editModal.dataset.routeId
  const route = routesData[routeId]
  if (!route) return

  // Set modal title
  document.getElementById("fieldEditTitle").textContent = `Edit ${fieldName.replace("route", "")}`

  // Get current field value
  const currentValue = document.getElementById(fieldName).textContent

  // Create form based on field type
  const formContainer = document.querySelector(".field-edit-form")
  formContainer.innerHTML = ""

  switch (fieldName) {
    case "routeName":
    case "routeLocation":
      formContainer.innerHTML = `
        <div class="form-group">
          <label for="fieldInput">Enter new value:</label>
          <input type="text" id="fieldInput" class="form-control" value="${currentValue}">
        </div>
      `
      break
    case "routeDescription":
      formContainer.innerHTML = `
        <div class="form-group">
          <label for="fieldInput">Enter new description:</label>
          <textarea id="fieldInput" class="form-control" rows="6">${currentValue}</textarea>
        </div>
      `
      break
    case "routeType":
      formContainer.innerHTML = `
        <div class="form-group">
          <label for="fieldInput">Select route type:</label>
          <select id="fieldInput" class="form-control">
            <option value="пеший" ${currentValue === "пеший" ? "selected" : ""}>Walking</option>
            <option value="автодом" ${currentValue === "автодом" ? "selected" : ""}>Car</option>
            <option value="велосипед" ${currentValue === "велосипед" ? "selected" : ""}>Bicycle</option>
            <option value="поход" ${currentValue === "поход" ? "selected" : ""}>Hiking</option>
          </select>
        </div>
      `
      break
    case "routeDifficulty":
      formContainer.innerHTML = `
        <div class="form-group">
          <label for="fieldInput">Select difficulty level:</label>
          <select id="fieldInput" class="form-control">
            <option value="легкая" ${currentValue === "легкая" ? "selected" : ""}>Easy</option>
            <option value="средняя" ${currentValue === "средняя" ? "selected" : ""}>Medium</option>
            <option value="сложная" ${currentValue === "сложная" ? "selected" : ""}>Hard</option>
          </select>
        </div>
      `
      break
    case "routeDuration":
      formContainer.innerHTML = `
        <div class="form-group">
          <label for="durationValue">Duration:</label>
          <div style="display: flex; gap: 10px;">
            <input type="number" id="durationValue" class="form-control" value="${Number.parseInt(currentValue)}" min="1" style="width: 70%;">
            <select id="durationUnit" class="form-control" style="width: 30%;">
              <option value="часа" ${currentValue.includes("час") ? "selected" : ""}>Hours</option>
              <option value="дней" ${currentValue.includes("дн") ? "selected" : ""}>Days</option>
            </select>
          </div>
        </div>
      `
      break
    case "routePoints":
      formContainer.innerHTML = `
        <div class="form-group">
          <label for="fieldInput">Number of points:</label>
          <input type="number" id="fieldInput" class="form-control" value="${currentValue}" min="1">
        </div>
      `
      break
    case "routeStatus":
      formContainer.innerHTML = `
        <div class="form-group">
          <label for="fieldInput">Select status:</label>
          <select id="fieldInput" class="form-control">
            <option value="Published" ${currentValue === "Published" ? "selected" : ""}>Published</option>
            <option value="Draft" ${currentValue === "Draft" ? "selected" : ""}>Draft</option>
            <option value="Archived" ${currentValue === "Archived" ? "selected" : ""}>Archived</option>
          </select>
        </div>
      `
      break
    case "routeVisibility":
      formContainer.innerHTML = `
        <div class="form-group">
          <label for="fieldInput">Select visibility:</label>
          <select id="fieldInput" class="form-control">
            <option value="Public" ${currentValue === "Public" ? "selected" : ""}>Public</option>
            <option value="Private" ${currentValue === "Private" ? "selected" : ""}>Private</option>
            <option value="Unlisted" ${currentValue === "Unlisted" ? "selected" : ""}>Unlisted</option>
          </select>
        </div>
      `
      break
    case "routePrice":
      formContainer.innerHTML = `
        <div class="form-group">
          <label for="fieldInput">Price (leave empty for free):</label>
          <input type="text" id="fieldInput" class="form-control" value="${currentValue === "Free" ? "" : currentValue}" placeholder="e.g. 9.99">
        </div>
      `
      break
    case "previewMap":
      formContainer.innerHTML = `
        <div class="form-group">
          <label for="fieldInput">Map image URL:</label>
          <input type="text" id="fieldInput" class="form-control" value="${document.getElementById("previewMap").src}">
          <p class="form-help">Enter the URL of the new map image</p>
        </div>
      `
      break
    default:
      formContainer.innerHTML = `
        <div class="form-group">
          <label for="fieldInput">Enter new value:</label>
          <input type="text" id="fieldInput" class="form-control" value="${currentValue}">
        </div>
      `
  }

  // Store the field name in the modal for reference
  document.getElementById("fieldEditModal").dataset.fieldName = fieldName
  document.getElementById("fieldEditModal").dataset.editType = "field"

  // Show the modal
  document.getElementById("fieldEditModal").style.display = "block"
}

// Also fix the openPointEditModal function to ensure proper gallery setup
// Replace the openPointEditModal function with this new version that uses horizontal scrolling gallery
function openPointEditModal(pointIndex) {
  const editModal = document.getElementById("editRouteModal")
  const routeId = editModal.dataset.routeId
  const route = routesData[routeId]
  if (!route || !route.landmarks || !route.landmarks[pointIndex]) return

  const landmark = route.landmarks[pointIndex]

  // Set modal title
  document.getElementById("fieldEditTitle").textContent = `Edit Route Point`

  // Create form for editing the point with gallery
  const formContainer = document.querySelector(".field-edit-form")

  // For demo purposes, we'll create a gallery with the main image and some related images
  // In a real app, each landmark would have its own gallery array
  const pointImages = [landmark.image]

  // Add some related images from the route gallery for demo purposes
  if (route.gallery && route.gallery.length > 0) {
    // Add up to 4 more images from the route gallery
    for (let i = 0; i < Math.min(4, route.gallery.length); i++) {
      if (route.gallery[i] !== landmark.image) {
        pointImages.push(route.gallery[i])
      }
    }
  }

  // Create the form with horizontal scrolling gallery
  formContainer.innerHTML = `
    <div class="form-group">
      <label for="pointName">Point Name:</label>
      <input type="text" id="pointName" class="form-control" value="${landmark.name}">
    </div>
    
    <div class="form-group">
      <label>Point Gallery:</label>
      <div class="point-gallery-container">
        <div class="point-gallery-scroll">
          ${pointImages
            .map(
              (img, idx) => `
            <div class="point-gallery-item">
              <img src="${img}" alt="Point image ${idx + 1}">
              <button class="point-gallery-image-delete" title="Delete image">
                <i class="fas fa-trash-alt"></i>
              </button>
            </div>
          `,
            )
            .join("")}
          <div class="point-gallery-add-item">
            <button class="add-point-image-btn" title="Add image">
              <i class="fas fa-plus"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <div class="form-group">
      <label for="pointDescription">Description:</label>
      <textarea id="pointDescription" class="form-control" rows="4">Description for this point...</textarea>
    </div>
  `

  // Store the point index in the modal for reference
  document.getElementById("fieldEditModal").dataset.pointIndex = pointIndex
  document.getElementById("fieldEditModal").dataset.editType = "point"

  // Show the modal
  document.getElementById("fieldEditModal").style.display = "block"

  // Add event listener for adding images
  const addImageBtn = formContainer.querySelector(".add-point-image-btn")
  if (addImageBtn) {
    addImageBtn.addEventListener("click", addImageToPointGallery)
  }

  // Add event listeners for deleting images
  const deleteButtons = formContainer.querySelectorAll(".point-gallery-image-delete")
  deleteButtons.forEach((btn, idx) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation()
      const gallery = formContainer.querySelector(".point-gallery-scroll")
      const images = gallery.querySelectorAll(".point-gallery-item:not(.point-gallery-add-item)")

      // Don't delete if it's the only image
      if (images.length <= 1) return

      // Remove the image
      const imageToRemove = images[idx]
      imageToRemove.remove()
    })
  })
}

// Save field edit
function saveFieldEdit() {
  const fieldEditModal = document.getElementById("fieldEditModal")
  const editType = fieldEditModal.dataset.editType

  // If we're editing a route point
  if (editType === "point") {
    const pointIndex = fieldEditModal.dataset.pointIndex
    const editModal = document.getElementById("editRouteModal")
    const routeId = editModal.dataset.routeId
    const route = routesData[routeId]

    if (!route || !route.landmarks || !route.landmarks[pointIndex]) return

    // Get the updated values
    const pointName = document.getElementById("pointName").value
    const pointDescription = document.getElementById("pointDescription").value

    // Get the active image from the gallery
    const activeImage = fieldEditModal.querySelector(".point-gallery-image.active img")
    const pointImage = activeImage ? activeImage.src : route.landmarks[pointIndex].image

    // Update the point in the UI
    const pointItem = document.querySelector(`.route-point-item:nth-child(${Number.parseInt(pointIndex) + 1})`)
    if (pointItem) {
      pointItem.querySelector(".point-name").textContent = pointName
      pointItem.querySelector(".point-image img").src = pointImage
      pointItem.querySelector(".point-description").textContent = pointDescription
    }

    // Close the field edit modal
    closeModal(fieldEditModal)
    return
  }

  // Original field edit code for other fields
  const fieldName = fieldEditModal.dataset.fieldName
  const editModal = document.getElementById("editRouteModal")
  const routeId = editModal.dataset.routeId

  // Get the new value
  let newValue

  if (fieldName === "routeDuration") {
    const durationValue = document.getElementById("durationValue").value
    const durationUnit = document.getElementById("durationUnit").value
    newValue = `${durationValue} ${durationUnit}`
  } else {
    const fieldInput = document.getElementById("fieldInput")
    newValue = fieldInput.value

    // Special handling for price
    if (fieldName === "routePrice" && (!newValue || newValue.trim() === "")) {
      newValue = "Free"
    }
  }

  // Update the field in the edit modal
  if (fieldName === "previewMap") {
    document.getElementById("previewMap").src = newValue
  } else {
    document.getElementById(fieldName).textContent = newValue
  }

  // Close the field edit modal
  closeModal(fieldEditModal)
}

// Save route changes
function saveRouteChanges() {
  // In a real app, you would send the updated route data to the server
  // For this demo, we'll just show an alert
  alert("Route changes saved successfully!")

  // Close the edit modal
  closeModal(document.getElementById("editRouteModal"))

  // Refresh the routes list
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))
  if (currentUser) {
    const userRoutes = routesData.filter((route) => route.author === currentUser.nickname)
    populateRoutesList(userRoutes)
  }
}

// Delete route
function deleteRoute() {
  const deleteModal = document.getElementById("deleteConfirmModal")
  const routeId = deleteModal.dataset.routeId

  // In a real app, you would send a delete request to the server
  // For this demo, we'll just show an alert
  alert(`Route deleted successfully!`)

  // Close the delete modal
  closeModal(deleteModal)

  // Refresh the routes list
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))
  if (currentUser) {
    const userRoutes = routesData.filter((route) => route.author === currentUser.nickname)
    populateRoutesList(userRoutes)
  }
}

// Add new image to gallery
function addNewImage() {
  // In a real app, you would open a file picker or URL input
  // For this demo, we'll just add a placeholder image
  const galleryGrid = document.getElementById("routeGallery")
  const newIndex = galleryGrid.children.length

  const galleryItem = document.createElement("div")
  galleryItem.className = "gallery-item"
  galleryItem.innerHTML = `
    <img src="/global-adventure.png" alt="New gallery image">
    <div class="gallery-actions">
      <button class="gallery-edit-btn" data-index="${newIndex}">
        <i class="fas fa-pencil-alt"></i>
      </button>
      <button class="gallery-delete-btn" data-index="${newIndex}">
        <i class="fas fa-trash-alt"></i>
      </button>
    </div>
  `
  galleryGrid.appendChild(galleryItem)
}

// Add new route point
function addNewPoint() {
  // In a real app, you would open a form to add point details
  // For this demo, we'll just add a placeholder point
  const pointsList = document.getElementById("routePointsList")
  const newIndex = pointsList.children.length

  const pointItem = document.createElement("div")
  pointItem.className = "route-point-item"
  pointItem.innerHTML = `
    <div class="point-number">${newIndex + 1}</div>
    <div class="point-image">
      <img src="/historic-city-square.png" alt="New point">
    </div>
    <div class="point-info">
      <div class="point-name">New Point</div>
      <div class="point-description">Description for the new point...</div>
    </div>
    <div class="point-actions">
      <button class="point-edit-btn" data-index="${newIndex}">
        <i class="fas fa-pencil-alt"></i>
      </button>
      <button class="point-delete-btn" data-index="${newIndex}">
        <i class="fas fa-trash-alt"></i>
      </button>
    </div>
  `
  pointsList.appendChild(pointItem)
}

// Close all modals
function closeAllModals() {
  const modals = document.querySelectorAll(".modal")
  modals.forEach((modal) => {
    closeModal(modal)
  })
}

// Close specific modal
function closeModal(modal) {
  modal.style.display = "none"
}
