// Import routesData or declare it
// Assuming routesData is in a separate file called routes.js
// You might need to adjust the path depending on your project structure
import routesData from "./routes.js"

// Add this function to load the filter modal content
function loadFilterModal() {
  fetch("filter-modal.html")
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("filterOverlay").innerHTML = html

      // Initialize the filter functionality after loading the content
      initializeFilters()
    })
    .catch((error) => {
      console.error("Error loading filter modal:", error)
    })
}

// Initialize filters
function initializeFilters() {
  // Get DOM elements after they're loaded
  const pointsSlider = document.getElementById("pointsSlider")
  const pointsValue = document.getElementById("pointsValue")

  if (pointsSlider && pointsValue) {
    // Update points value display
    pointsValue.textContent = pointsSlider.value
    pointsSlider.addEventListener("input", () => {
      pointsValue.textContent = pointsSlider.value
    })
  }

  // Add data attributes to your route cards for filtering
  const routeCards = document.querySelectorAll(".card")
  routeCards.forEach((card, index) => {
    const route = routesData[index]
    if (route) {
      card.setAttribute("data-type", route.type)
      card.setAttribute("data-duration", route.duration.split(" ")[0]) // Extract number from "3 часа"
      card.setAttribute("data-duration-type", route.duration.includes("час") ? "hours" : "days")
      card.setAttribute("data-difficulty", route.difficulty)
      card.setAttribute("data-points", route.points)
      card.setAttribute("data-price", route.price || 0)
      card.setAttribute("data-subscription", route.subscription || false)
    }
  })
}

// Call this function when the page loads
document.addEventListener("DOMContentLoaded", loadFilterModal)
