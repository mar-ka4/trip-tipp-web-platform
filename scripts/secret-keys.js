// Secret keys that grant immediate access to route creation
const secretKeys = [
    {
      key: "EXPLORER2023",
      level: "author",
      expiresAt: "2023-12-31",
    },
    {
      key: "TRAVELPRO",
      level: "author",
      expiresAt: "2023-12-31",
    },
    {
      key: "ROUTEMASTER",
      level: "admin",
      expiresAt: "2024-12-31",
    },
    {
      key: "TRIPGUIDE",
      level: "author",
      expiresAt: "2024-06-30",
    },
  ]
  
  /**
   * Validates a secret key
   * @param {string} keyToCheck - The key to validate
   * @returns {object|null} - Key object if valid, null if invalid
   */
  export function validateSecretKey(keyToCheck) {
    if (!keyToCheck) return null
  
    const key = secretKeys.find((k) => k.key === keyToCheck.toUpperCase())
  
    if (!key) return null
  
    // Check if key is expired
    const currentDate = new Date()
    const expiryDate = new Date(key.expiresAt)
  
    if (currentDate > expiryDate) {
      return null // Key is expired
    }
  
    return key
  }
  
  export default secretKeys
  