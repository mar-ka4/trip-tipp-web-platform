document.addEventListener("DOMContentLoaded", () => {
    // Exchange rates relative to USD (approximate values, should be updated with real API)
    const exchangeRates = {
      USD: 1,
      EUR: 0.92,
      CNY: 7.23,
      UAH: 39.5,
      RUB: 91.8,
    }
  
    // Get all price input elements
    const priceUSD = document.getElementById("price-usd")
    const priceEUR = document.getElementById("price-eur")
    const priceCNY = document.getElementById("price-cny")
    const priceUAH = document.getElementById("price-uah")
    const priceRUB = document.getElementById("price-rub")
  
    // Collection of all price inputs
    const priceInputs = {
      USD: priceUSD,
      EUR: priceEUR,
      CNY: priceCNY,
      UAH: priceUAH,
      RUB: priceRUB,
    }
  
    // Function to convert USD to other currencies
    function convertFromUSD(usdAmount) {
      if (!usdAmount || isNaN(usdAmount)) return {}
  
      const converted = {}
      for (const currency in exchangeRates) {
        if (currency !== "USD") {
          converted[currency] = (usdAmount * exchangeRates[currency]).toFixed(2)
        }
      }
      return converted
    }
  
    // Function to convert any currency to USD
    function convertToUSD(amount, fromCurrency) {
      if (!amount || isNaN(amount)) return 0
      return (amount / exchangeRates[fromCurrency]).toFixed(2)
    }
  
    // Update placeholders when USD changes
    priceUSD.addEventListener("input", function () {
      const usdValue = Number.parseFloat(this.value)
      const converted = convertFromUSD(usdValue)
  
      // Update placeholders for other currencies
      for (const currency in converted) {
        if (priceInputs[currency].value === "") {
          priceInputs[currency].placeholder = converted[currency]
        }
      }
    })
  
    // Handle input in other currency fields
    for (const currency in priceInputs) {
      if (currency !== "USD") {
        priceInputs[currency].addEventListener("input", function () {
          const value = Number.parseFloat(this.value)
          const currencyCode = this.id.split("-")[1].toUpperCase()
  
          // Only update USD if it's empty
          if (priceUSD.value === "" && value) {
            const usdValue = convertToUSD(value, currencyCode)
            priceUSD.placeholder = usdValue
          }
        })
      }
    }
  
    // Clear placeholder when focusing on an input
    for (const currency in priceInputs) {
      priceInputs[currency].addEventListener("focus", function () {
        this.placeholder = ""
      })
  
      // Restore placeholder when leaving an empty input
      priceInputs[currency].addEventListener("blur", function () {
        if (this.value === "") {
          const currencyCode = this.id.split("-")[1].toUpperCase()
          if (currencyCode !== "USD" && priceUSD.value !== "") {
            const usdValue = Number.parseFloat(priceUSD.value)
            const converted = convertFromUSD(usdValue)
            this.placeholder = converted[currencyCode] || "0.00"
          } else {
            this.placeholder = "0.00"
          }
        }
      })
    }
  })
  