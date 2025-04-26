export default [
  {
    nickname: "mar_ka4",
    password: "mar123",
    email: "marrr.parr@example.com",
    phone: "+38 (096) 319 91 11",
    isVerifiedForRoutes: true,
    hasSubmittedVerificationForm: false,
    userStatus: "гид",
    description:
      "Люблю делиться историями городов! Создаю пешие маршруты по Европе, раскрывая их культурное и историческое богатство. Мои туры — это уютные прогулки с глубокими рассказами. Подключение специфичных стилей, если нужны",
    visitedCountries: 10,
    createdRoutes: 2,
    connectedAccounts: {
      google: { connected: true, email: "marka4@gmail.com" },
      facebook: { connected: false, email: "" },
      apple: { connected: true, email: "marka4@icloud.com" },
    },
    twoFactorAuth: {
      enabled: true,
      method: "app", // "app", "sms", "email"
    },
    securityNotifications: {
      loginAlerts: true,
      securityAlerts: true,
      accountChanges: true,
    },
    accountCreated: "2022-06-15T00:00:00",
    avatar: "img/zaglushki/pepe.jpg",
    backupEmail: "backup.marka4@example.com",
  
  },
  {
    nickname: "debil",
    password: "deb456",
    email: "debil@example.com",
    phone: "+7 (999) 987-65-43",
    isVerifiedForRoutes: false,
    hasSubmittedVerificationForm: false,
    userStatus: "турист",
    description:
      "Путешествую ради приключений! От токийских улиц до исландских фьордов — мои маршруты для тех, кто ищет яркие впечатления и необычные места.",
    visitedCountries: 8,
    createdRoutes: 2,
    connectedAccounts: {
      google: { connected: true, email: "debil@gmail.com" },
      facebook: { connected: true, email: "debil@facebook.com" },
      apple: { connected: false, email: "" },
    },
    twoFactorAuth: {
      enabled: false,
      method: "none",
    },
    securityNotifications: {
      loginAlerts: false,
      securityAlerts: true,
      accountChanges: false,
    },
    accountCreated: "2022-08-10T00:00:00",
    avatar: "img/zaglushki/1.png",
    backupEmail: "",
  },
]
