const routesData = [
  {
    name: "Historical Landmarks and Iconic Sights of Berlin",
    location: "Germany (Berlin)",
    type: "пеший",
    points: 12,
    duration: "3 часа",
    difficulty: "средняя",
    gallery: ["img/berlin-1/b1.png", "img/berlin-1/b2.png", "img/berlin-1/b3.png", "img/berlin-1/b4.png"],
    description:
      "Ищете экскурсию на французском языке? Хотите истории, анекдоты и судьбы берлинцев? Мои туры для вас! Экскурсии с гидом, которые я предлагаю, позволят вам открыть для себя Берлин тихо, в небольшой группе, с исторической, но также политической, социальной и экономической точек зрения. Автор экскурсионного гида и книги о немецкой мемориальной политике, я в мельчайших деталях знаю столицу, в которой живу с 1994 года. Благодаря его журналистской деятельности и встречи многих свидетелей истории с 1945 года, которые позволили мне обогатить мои объяснения о душе этого города, которые трудно понять. Небольшой размер группы (до 8 человек) позволяет постоянно обмениваться идеями между участниками.",
    previewMap: "img/prev-map-1.png",
    landmarks: [
      { name: "Рейхстаг", image: "img/berlin-1/b1.png" },
      { name: "Бранденбургские ворота", image: "img/berlin-1/b2.png" },
      { name: "Берлинская стена", image: "img/berlin-1/b3.png" },
      { name: "Мемориал Холокоста", image: "img/berlin-1/b4.png" },
    ],
    author: "mar_ka4",
    // Данные для аналитики
    totalUses: 16,
    subscriptionUses: 10,
    oneTimeUses: 6,
    subscriptionRevenue: 214.75,
    oneTimeRevenue: 124.45,
    totalRevenue: 339.2,
    createdAt: "2023-05-15",
    // Добавленные точки маршрута
    routePoints: [
      {
        name: "Рейхстаг",
        description:
          "Историческое здание парламента Германии с впечатляющим стеклянным куполом, откуда открывается панорамный вид на город. Здесь заседает Бундестаг, а посетители могут узнать об истории немецкой демократии через интерактивные экспозиции.",
        coordinates: "52.5186, 13.3762",
        gallery: [
          "img/berlin-1/reichstag1.png",
          "img/berlin-1/reichstag2.png",
          "img/berlin-1/reichstag3.png",
          "img/berlin-1/reichstag4.png",
        ],
      },
      {
        name: "Бранденбургские ворота",
        description:
          "Знаменитый неоклассический памятник и символ Берлина, построенный в конце 18 века. Ворота служили границей между Восточным и Западным Берлином во время холодной войны, а сегодня символизируют единство Германии.",
        coordinates: "52.5163, 13.3777",
        gallery: ["img/berlin-1/brandenburg1.png", "img/berlin-1/brandenburg2.png", "img/berlin-1/brandenburg3.png"],
      },
      {
        name: "Мемориал Холокоста",
        description:
          "Впечатляющий мемориал, состоящий из 2711 бетонных блоков разной высоты, посвященный памяти евреев, погибших во время Холокоста. Подземный информационный центр содержит истории жертв и их семей.",
        coordinates: "52.5139, 13.3789",
        gallery: [
          "img/berlin-1/holocaust1.png",
          "img/berlin-1/holocaust2.png",
          "img/berlin-1/holocaust3.png",
          "img/berlin-1/holocaust4.png",
          "img/berlin-1/holocaust5.png",
        ],
      },
      {
        name: "Берлинская стена (Истсайдская галерея)",
        description:
          "Самый длинный сохранившийся участок Берлинской стены, превращенный в художественную галерею под открытым небом. Здесь представлены работы художников со всего мира, отражающие темы свободы и объединения.",
        coordinates: "52.5039, 13.4393",
        gallery: ["img/berlin-1/wall1.png", "img/berlin-1/wall2.png", "img/berlin-1/wall3.png"],
      },
      {
        name: "Музейный остров",
        description:
          "Уникальный комплекс из пяти музеев мирового класса, расположенных на острове на реке Шпрее. Включает Пергамский музей, Старый музей, Новый музей, Старую национальную галерею и музей Боде с коллекциями от древнего Египта до 19 века.",
        coordinates: "52.5208, 13.3979",
        gallery: [
          "img/berlin-1/museum1.png",
          "img/berlin-1/museum2.png",
          "img/berlin-1/museum3.png",
          "img/berlin-1/museum4.png",
        ],
      },
    ],
  },
  {
    name: "Vibrant Streets of Tokyo: Shibuya to Harajuku",
    location: "Japan (Tokyo)",
    type: "пеший",
    points: 10,
    duration: "4 часа",
    difficulty: "легкая",
    gallery: [
      "img/tokyo-1/t-1.png",
      "img/tokyo-1/t-2.png",
      "img/tokyo-1/t-3.png",
      "img/tokyo-1/t-4.png",
      "img/tokyo-1/t-5.png",
      "img/tokyo-1/t-6.png",
    ],
    description:
      "Погрузитесь в яркую энергию Токио с этим пешим маршрутом от оживленного перекрестка Сибуя до эклектичных улиц Харадзюку. Начните с культового перекрестка Сибуя, одного из самых загруженных в мире, и посетите статую верного пса Хатико. Прогуляйтесь по модным бутикам и кафе в районе Катакаура. Затем отправляйтесь в Харадзюку, центр молодежной культуры и уличной моды, где вас ждет знаменитая улица Такэсита с ее необычными магазинами и креативными угощениями.",
    previewMap: "img/prev-map-1.png",
    landmarks: [
      { name: "Перекресток Сибуя", image: "img/tokyo-1/t-1.png" },
      { name: "Статуя Хатико", image: "img/tokyo-1/t-2.png" },
      { name: "Улица Такэсита", image: "img/tokyo-1/t-3.png" },
      { name: "Парк Ёёги", image: "img/tokyo-1/t-4.png" },
    ],
    author: "debil",
    // Данные для аналитики
    totalUses: 24,
    subscriptionUses: 14,
    oneTimeUses: 10,
    subscriptionRevenue: 266.5,
    oneTimeRevenue: 186.3,
    totalRevenue: 452.8,
    createdAt: "2023-07-22",
    // Добавленные точки маршрута
    routePoints: [
      {
        name: "Перекресток Сибуя",
        description:
          "Один из самых оживленных перекрестков в мире, где одновременно могут переходить дорогу до 3000 человек. Окруженный неоновыми вывесками и гигантскими экранами, этот перекресток стал символом современного Токио и часто появляется в фильмах и телешоу.",
        coordinates: "35.6595, 139.7004",
        gallery: [
          "img/tokyo-1/shibuya1.png",
          "img/tokyo-1/shibuya2.png",
          "img/tokyo-1/shibuya3.png",
          "img/tokyo-1/shibuya4.png",
        ],
      },
      {
        name: "Статуя Хатико",
        description:
          "Знаменитая бронзовая статуя собаки породы акита-ину, ставшая символом верности. Хатико каждый день встречал своего хозяина на станции Сибуя и продолжал приходить туда в течение 9 лет после его смерти. Сегодня это популярное место встречи в Токио.",
        coordinates: "35.6591, 139.7005",
        gallery: ["img/tokyo-1/hachiko1.png", "img/tokyo-1/hachiko2.png", "img/tokyo-1/hachiko3.png"],
      },
      {
        name: "Центр Сибуя 109",
        description:
          "Знаковый торговый центр, ставший эпицентром молодежной моды в Токио. Десять этажей заполнены бутиками японских дизайнеров и модных брендов, ориентированных на молодых женщин. Место рождения многих модных тенденций Японии.",
        coordinates: "35.6590, 139.6983",
        gallery: ["img/tokyo-1/109-1.png", "img/tokyo-1/109-2.png", "img/tokyo-1/109-3.png", "img/tokyo-1/109-4.png"],
      },
      {
        name: "Улица Такэсита",
        description:
          "Пешеходная улица длиной 400 метров, являющаяся центром молодежной культуры и авангардной моды Японии. Здесь расположены сотни магазинов, предлагающих все: от готической лолиты до косплей-костюмов, а также необычные кафе и сладости.",
        coordinates: "35.6715, 139.7031",
        gallery: [
          "img/tokyo-1/takeshita1.png",
          "img/tokyo-1/takeshita2.png",
          "img/tokyo-1/takeshita3.png",
          "img/tokyo-1/takeshita4.png",
          "img/tokyo-1/takeshita5.png",
        ],
      },
      {
        name: "Парк Ёёги",
        description:
          "Обширный зеленый парк, предлагающий спокойный отдых от городской суеты. По выходным здесь собираются музыканты, танцоры и косплееры. В парке также находится храм Мэйдзи, посвященный императору Мэйдзи и его супруге.",
        coordinates: "35.6712, 139.6952",
        gallery: ["img/tokyo-1/yoyogi1.png", "img/tokyo-1/yoyogi2.png", "img/tokyo-1/yoyogi3.png"],
      },
    ],
  },
  {
    name: "Icelandic Ring Road Camper Adventure",
    location: "Iceland (Ring Road)",
    type: "автодом",
    points: 10,
    duration: "7 дней",
    difficulty: "средняя",
    gallery: [
      "img/island-1/i1.png",
      "img/island-1/i2.png",
      "img/island-1/i3.png",
      "img/island-1/i4.png",
      "img/island-1/i5.png",
      "img/island-1/i6.png",
      "img/island-1/i7.png",
      "img/island-1/i8.png",
      "img/island-1/i9.png",
    ],
    description:
      "Отправьтесь в незабываемое недельное путешествие по кольцевой дороге Исландии на автодоме. Начните в Рейкьявике и исследуйте гейзеры и водопады Золотого кольца, черные песчаные пляжи Южного побережья, спокойные Восточные фьорды и вулканические чудеса Севера. Основные достопримечательности включают Национальный парк Тингветлир, горячие источники Гейсир, водопад Гюдльфосс, пляж Рейнисфьяра, ледниковую лагуну Йёкюльсаурлоун, деревню Сейдисфьордюр и водопад Годафосс. Идеально для искателей приключений, жаждущих свободы, природы и необузданной красоты Исландии.",
    previewMap: "img/prev-map-1.png",
    landmarks: [
      { name: "Гейзер Строккюр", image: "img/island-1/i1.png" },
      { name: "Водопад Гюдльфосс", image: "img/island-1/i2.png" },
      { name: "Черный пляж Рейнисфьяра", image: "img/island-1/i3.png" },
      { name: "Ледниковая лагуна Йёкюльсаурлоун", image: "img/island-1/i4.png" },
    ],
    author: "debil",
    // Данные для аналитики
    totalUses: 12,
    subscriptionUses: 8,
    oneTimeUses: 4,
    subscriptionRevenue: 188.9,
    oneTimeRevenue: 98.75,
    totalRevenue: 287.65,
    createdAt: "2023-09-05",
    // Добавленные точки маршрута
    routePoints: [
      {
        name: "Рейкьявик",
        description:
          "Столица Исландии и отправная точка путешествия. Компактный и красочный город с уникальной архитектурой, включая впечатляющую церковь Хатльгримскиркья и концертный зал Харпа. Отличное место для знакомства с исландской культурой перед началом путешествия.",
        coordinates: "64.1466, -21.9426",
        gallery: [
          "img/island-1/reykjavik1.png",
          "img/island-1/reykjavik2.png",
          "img/island-1/reykjavik3.png",
          "img/island-1/reykjavik4.png",
        ],
      },
      {
        name: "Национальный парк Тингветлир",
        description:
          "Объект Всемирного наследия ЮНЕСКО, где встречаются Североамериканская и Евразийская тектонические плиты. Здесь также находился первый парламент Исландии, основанный в 930 году. Посетители могут пройти между континентальными плитами и увидеть впечатляющие геологические формации.",
        coordinates: "64.2559, -21.1295",
        gallery: [
          "img/island-1/thingvellir1.png",
          "img/island-1/thingvellir2.png",
          "img/island-1/thingvellir3.png",
          "img/island-1/thingvellir4.png",
          "img/island-1/thingvellir5.png",
        ],
      },
      {
        name: "Гейзер Строккюр",
        description:
          "Активный гейзер, извергающийся каждые 5-10 минут, выбрасывая столб горячей воды на высоту до 30 метров. Часть геотермальной области Хаукадалур, где можно увидеть кипящие грязевые ямы и паровые отверстия. Одна из самых популярных достопримечательностей Золотого кольца.",
        coordinates: "64.3104, -20.3024",
        gallery: ["img/island-1/strokkur1.png", "img/island-1/strokkur2.png", "img/island-1/strokkur3.png"],
      },
      {
        name: "Водопад Гюдльфосс",
        description:
          "Величественный двухуровневый водопад, где вода падает с высоты 32 метра в узкий каньон. Название переводится как 'Золотой водопад', и в солнечные дни в брызгах воды часто можно увидеть радугу. Одно из самых впечатляющих природных чудес Исландии.",
        coordinates: "64.3271, -20.1199",
        gallery: [
          "img/island-1/gullfoss1.png",
          "img/island-1/gullfoss2.png",
          "img/island-1/gullfoss3.png",
          "img/island-1/gullfoss4.png",
        ],
      },
      {
        name: "Черный пляж Рейнисфьяра",
        description:
          "Драматический пляж с черным вулканическим песком, базальтовыми колоннами и морскими пещерами. Рядом находятся скальные образования Рейнисдрангар, согласно легенде, это тролли, превратившиеся в камень на рассвете. Пляж известен своими мощными волнами, поэтому следует соблюдать осторожность.",
        coordinates: "63.4042, -19.0644",
        gallery: [
          "img/island-1/reynisfjara1.png",
          "img/island-1/reynisfjara2.png",
          "img/island-1/reynisfjara3.png",
          "img/island-1/reynisfjara4.png",
          "img/island-1/reynisfjara5.png",
        ],
      },
    ],
  },
  {
    name: "Classic London Landmarks Walk",
    location: "United Kingdom (London)",
    type: "пеший",
    points: 8,
    duration: "4 часа",
    difficulty: "легкая",
    gallery: [
      "img/london-1/l1.png",
      "img/london-1/l2.png",
      "img/london-1/l3.png",
      "img/london-1/l4.png",
      "img/london-1/l5.png",
      "img/london-1/l6.png",
    ],
    description:
      "Погрузитесь в сердце Лондона с этим пешим маршрутом по его знаковым достопримечательностям! Начните с Биг-Бена и Вестминстерского аббатства, где оживает история британской короны. Пройдитесь по Трафальгарской площади, окружённой музеями и львами Нельсона. Увидьте смену караула у Букингемского дворца и прогуляйтесь вдоль Темзы к Лондонскому глазу, наслаждаясь панорамой города. Завершите тур у Тауэрского моста и Тауэра, хранящих многовековые тайны. Этот маршрут идеален для тех, кто хочет за один день увидеть лучшее в Лондоне!",
    previewMap: "img/prev-map-1.png",
    landmarks: [
      { name: "Биг-Бен", image: "img/london-1/l1.png" },
      { name: "Букингемский дворец", image: "img/london-1/l2.png" },
      { name: "Трафальгарская площадь", image: "img/london-1/l3.png" },
      { name: "Тауэрский мост", image: "img/london-1/l4.png" },
    ],
    author: "mar_ka4",
    // Данные для аналитики
    totalUses: 9,
    subscriptionUses: 6,
    oneTimeUses: 3,
    subscriptionRevenue: 140.0,
    oneTimeRevenue: 75.4,
    totalRevenue: 215.4,
    createdAt: "2023-10-18",
    // Добавленные точки маршрута
    routePoints: [
      {
        name: "Биг-Бен и Вестминстерский дворец",
        description:
          "Знаменитая часовая башня и здание парламента Великобритании в неоготическом стиле. Биг-Бен - это на самом деле название 13-тонного колокола внутри башни, а не самой башни. Здесь заседают Палата общин и Палата лордов, формирующие британский парламент.",
        coordinates: "51.5007, -0.1246",
        gallery: [
          "img/london-1/bigben1.png",
          "img/london-1/bigben2.png",
          "img/london-1/bigben3.png",
          "img/london-1/bigben4.png",
        ],
      },
      {
        name: "Вестминстерское аббатство",
        description:
          "Величественная готическая церковь с историей более 1000 лет. Место коронации всех английских и британских монархов с 1066 года и место захоронения многих королей, королев, поэтов, ученых и государственных деятелей. Объект Всемирного наследия ЮНЕСКО.",
        coordinates: "51.4994, -0.1276",
        gallery: [
          "img/london-1/abbey1.png",
          "img/london-1/abbey2.png",
          "img/london-1/abbey3.png",
          "img/london-1/abbey4.png",
          "img/london-1/abbey5.png",
        ],
      },
      {
        name: "Трафальгарская площадь",
        description:
          "Знаковая площадь в центре Лондона с колонной Нельсона высотой 52 метра, окруженной четырьмя бронзовыми львами. Площадь является местом проведения общественных собраний, политических демонстраций и праздничных мероприятий. Рядом находится Национальная галерея.",
        coordinates: "51.5080, -0.1281",
        gallery: ["img/london-1/trafalgar1.png", "img/london-1/trafalgar2.png", "img/london-1/trafalgar3.png"],
      },
      {
        name: "Букингемский дворец",
        description:
          "Официальная лондонская резиденция британских монархов с 1837 года. Дворец с 775 комнатами служит местом для королевских церемоний, государственных визитов и туристической достопримечательностью. Знаменитая смена караула происходит в 11:00 в определенные дни.",
        coordinates: "51.5014, -0.1419",
        gallery: [
          "img/london-1/buckingham1.png",
          "img/london-1/buckingham2.png",
          "img/london-1/buckingham3.png",
          "img/london-1/buckingham4.png",
        ],
      },
      {
        name: "Тауэрский мост",
        description:
          "Знаменитый разводной мост через Темзу, построенный в 1894 году. Комбинация подвесного и разводного моста стала одним из символов Лондона. Посетители могут подняться на верхние переходы для панорамного вида на город и узнать об истории и механизме моста.",
        coordinates: "51.5055, -0.0754",
        gallery: [
          "img/london-1/towerbridge1.png",
          "img/london-1/towerbridge2.png",
          "img/london-1/towerbridge3.png",
          "img/london-1/towerbridge4.png",
          "img/london-1/towerbridge5.png",
        ],
      },
    ],
  },
  {
    name: "New York: Iconic Skyline Adventure",
    location: "United States (New York)",
    type: "пеший",
    points: 10,
    duration: "4 часа",
    difficulty: "легкая",
    gallery: [
      "img/ny-1/ny (1).png",
      "img/ny-1/ny (2).png",
      "img/ny-1/ny (3).png",
      "img/ny-1/ny (4).png",
      "img/ny-1/ny (5).png",
      "img/ny-1/ny (6).png",
      "img/ny-1/ny (7).png",
      "img/ny-1/ny (8).png",
      "img/ny-1/ny (9).png",
      "img/ny-1/ny (10).png",
    ],
    description:
      "Окунитесь в пульсирующую энергию Нью-Йорка с этим пешим маршрутом по его легендарным достопримечательностям! Начните с Таймс-сквер, где сияют неоновые огни и кипит жизнь. Пройдитесь до Центрального парка, зелёного оазиса среди небоскрёбов, идеального для спокойной прогулки. Посетите Рокфеллеровский центр, знаменитый своим катком и панорамными видами с Top of the Rock. Завершите тур у Статуи Свободы, символа свободы, с короткой поездкой на пароме, открывающей захватывающий вид на горизонт Манхэттена. Этот маршрут идеален для тех, кто хочет за один день почувствовать дух Большого Яблока!",
    previewMap: "img/prev-map-1.png",
    landmarks: [
      { name: "Таймс-сквер", image: "img/ny-1/ny (1).png" },
      { name: "Центральный парк", image: "img/ny-1/ny (2).png" },
      { name: "Рокфеллеровский центр", image: "img/ny-1/ny (3).png" },
      { name: "Статуя Свободы", image: "img/ny-1/ny (4).png" },
    ],
    author: "mar_ka4",
    // Данные для аналитики
    totalUses: 7,
    subscriptionUses: 5,
    oneTimeUses: 2,
    subscriptionRevenue: 175.5,
    oneTimeRevenue: 79.98,
    totalRevenue: 255.48,
    createdAt: "2023-06-10",
    // Добавленные точки маршрута
    routePoints: [
      {
        name: "Таймс-сквер",
        description:
          "Знаменитая площадь на пересечении Бродвея и Седьмой авеню, известная как 'Перекресток мира'. Яркие неоновые вывески, гигантские рекламные щиты и бурлящая энергия делают это место символом Нью-Йорка. Ежегодно здесь проходит знаменитое новогоднее мероприятие с падающим шаром.",
        coordinates: "40.7580, -73.9855",
        gallery: [
          "img/ny-1/times1.png",
          "img/ny-1/times2.png",
          "img/ny-1/times3.png",
          "img/ny-1/times4.png",

          "img/ny-1/times3.png",
          "img/ny-1/times4.png",
          "img/ny-1/times5.png",
        ],
      },
      {
        name: "Центральный парк",
        description:
          "Обширный городской парк площадью 341 гектар в центре Манхэттена. Оазис зелени среди небоскребов с озерами, лужайками, пешеходными дорожками и множеством достопримечательностей. Здесь находятся зоопарк, замок Бельведер, каток Уоллмен и многое другое для отдыха и развлечений.",
        coordinates: "40.7812, -73.9665",
        gallery: ["img/ny-1/central1.png", "img/ny-1/central2.png", "img/ny-1/central3.png", "img/ny-1/central4.png"],
      },
      {
        name: "Рокфеллеровский центр",
        description:
          "Комплекс из 19 коммерческих зданий, занимающий 22 акра между 48-й и 51-й улицами. Известен своей рождественской елкой, катком и смотровой площадкой Top of the Rock, откуда открывается потрясающий вид на Манхэттен, включая Эмпайр-стейт-билдинг и Центральный парк.",
        coordinates: "40.7587, -73.9787",
        gallery: [
          "img/ny-1/rockefeller1.png",
          "img/ny-1/rockefeller2.png",
          "img/ny-1/rockefeller3.png",
          "img/ny-1/rockefeller4.png",
          "img/ny-1/rockefeller5.png",
        ],
      },
      {
        name: "Эмпайр-стейт-билдинг",
        description:
          "Знаковый 102-этажный небоскреб в стиле ар-деко, построенный в 1931 году. Долгое время был самым высоким зданием в мире. Смотровые площадки на 86-м и 102-м этажах предлагают захватывающие панорамные виды на город с высоты птичьего полета.",
        coordinates: "40.7484, -73.9857",
        gallery: ["img/ny-1/empire1.png", "img/ny-1/empire2.png", "img/ny-1/empire3.png", "img/ny-1/empire4.png"],
      },
      {
        name: "Статуя Свободы",
        description:
          "Колоссальная неоклассическая скульптура на острове Свободы, подаренная Францией США в 1886 году. Высота от основания до факела составляет 93 метра. Символ свободы и демократии, встречающий иммигрантов, прибывающих в Америку. Доступ на остров осуществляется на пароме от Баттери-парка.",
        coordinates: "40.6892, -74.0445",
        gallery: [
          "img/ny-1/liberty1.png",
          "img/ny-1/liberty2.png",
          "img/ny-1/liberty3.png",
          "img/ny-1/liberty4.png",
          "img/ny-1/liberty5.png",
        ],
      },
    ],
  },
  {
    name: "Swiss Alps: Matterhorn Trail Adventure",
    location: "Switzerland (Zermatt)",
    type: "поход",
    points: 8,
    duration: "5 часов",
    difficulty: "средняя",
    gallery: [
      "img/switzerland/swz (1).png",
      "img/switzerland/swz (2).png",
      "img/switzerland/swz (3).png",
      "img/switzerland/swz (4).png",
      "img/switzerland/swz (5).png",
      "img/switzerland/swz (6).png",
    ],
    description:
      "Отправьтесь в захватывающий поход по Альпам Швейцарии с этим маршрутом вокруг легендарного Маттерхорна! Начните из Церматта, живописного городка у подножия гор. Пройдите по тропе к озеру Шварцзее, где открывается потрясающий вид на Маттерхорн. Продолжите путь через альпийские луга к смотровой площадке Хёрнли, где вас ждут панорамы заснеженных вершин. Завершите маршрут у горного приюта, наслаждаясь тишиной природы. Этот тур идеален для любителей активного отдыха, готовых вдохнуть свежий горный воздух и открыть красоту швейцарских Альп!",
    previewMap: "img/prev-map-1.png",
    landmarks: [
      { name: "Церматт", image: "img/switzerland/swz (1).png" },
      { name: "Озеро Шварцзее", image: "img/switzerland/swz (2).png" },
      { name: "Смотровая площадка Хёрнли", image: "img/switzerland/swz (3).png" },
      { name: "Маттерхорн", image: "img/switzerland/swz (4).png" },
    ],
    author: "debil",
    // Данные для аналитики
    totalUses: 18,
    subscriptionUses: 11,
    oneTimeUses: 7,
    subscriptionRevenue: 156.2,
    oneTimeRevenue: 104.93,
    totalRevenue: 261.13,
    createdAt: "2023-08-05",
    // Добавленные точки маршрута
    routePoints: [
      {
        name: "Церматт",
        description:
          "Живописный горный курортный городок, расположенный у подножия Маттерхорна на высоте 1620 метров. Известен своей безавтомобильной политикой - передвигаться можно только пешком, на велосипеде или электромобиле. Отправная точка для многих альпийских походов и горнолыжных маршрутов.",
        coordinates: "46.0207, 7.7491",
        gallery: [
          "img/switzerland/zermatt1.png",
          "img/switzerland/zermatt2.png",
          "img/switzerland/zermatt3.png",
          "img/switzerland/zermatt4.png",
        ],
      },
      {
        name: "Горная станция Зуннегга",
        description:
          "Первая остановка на маршруте, доступная на фуникулере из Церматта. Отсюда открывается великолепный вид на долину и окружающие горы. Здесь можно сделать первый привал и насладиться альпийскими пейзажами перед продолжением похода.",
        coordinates: "46.0292, 7.7672",
        gallery: ["img/switzerland/sunnegga1.png", "img/switzerland/sunnegga2.png", "img/switzerland/sunnegga3.png"],
      },
      {
        name: "Озеро Шварцзее",
        description:
          "Живописное горное озеро на высоте 2552 метра, окруженное альпийскими лугами. Название переводится как 'Черное озеро' из-за его темного цвета. Отсюда открывается один из самых впечатляющих видов на Маттерхорн, отражающийся в водах озера в ясную погоду.",
        coordinates: "45.9992, 7.7097",
        gallery: [
          "img/switzerland/schwarzsee1.png",
          "img/switzerland/schwarzsee2.png",
          "img/switzerland/schwarzsee3.png",
          "img/switzerland/schwarzsee4.png",
          "img/switzerland/schwarzsee5.png",
        ],
      },
      {
        name: "Смотровая площадка Хёрнли",
        description:
          "Панорамная точка на высоте 2800 метров на пути к базовому лагерю Маттерхорна. Отсюда открывается захватывающий вид на северную стену Маттерхорна и окружающие альпийские вершины. Популярное место для фотографирования и наблюдения за альпинистами.",
        coordinates: "45.9828, 7.6972",
        gallery: [
          "img/switzerland/hornli1.png",
          "img/switzerland/hornli2.png",
          "img/switzerland/hornli3.png",
          "img/switzerland/hornli4.png",
        ],
      },
      {
        name: "Горный приют Хёрнлихютте",
        description:
          "Исторический альпийский приют на высоте 3260 метров, служащий базовым лагерем для восхождений на Маттерхорн. Построен в 1880 году и недавно реконструирован. Предлагает базовые удобства для альпинистов и потрясающие виды на окружающие горы.",
        coordinates: "45.9769, 7.6767",
        gallery: [
          "img/switzerland/hornlihutte1.png",
          "img/switzerland/hornlihutte2.png",
          "img/switzerland/hornlihutte3.png",
          "img/switzerland/hornlihutte4.png",
        ],
      },
    ],
  },
  {
    name: "Эдинбург: Королевская миля и Старый город",
    location: "Scotland (Edinburgh)",
    type: "пеший",
    points: 9,
    duration: "4 часа",
    difficulty: "средняя",
    gallery: [
      "img/edinburgh/e1.png",
      "img/edinburgh/e2.png",
      "img/edinburgh/e3.png",
      "img/edinburgh/e4.png",
      "img/edinburgh/e5.png",
    ],
    description:
      "Исследуйте историческое сердце Эдинбурга с этим пешим маршрутом! Начните с Королевской мили, главной артерии Старого города, усеянной старинными зданиями и магазинами. Посетите замок Эдинбург, возвышающийся над городом, и узнайте его многовековую историю. Поднимитесь на холм Калтон, чтобы насладиться панорамой города. Завершите прогулку в Старом городе, где узкие улочки хранят тайны шотландской столицы. Идеально для любителей истории и живописных видов!",
    previewMap: "img/prev-map-1.png",
    landmarks: [
      { name: "Королевская миля", image: "img/edinburgh/e1.png" },
      { name: "Замок Эдинбург", image: "img/edinburgh/e2.png" },
      { name: "Холм Калтон", image: "img/edinburgh/e3.png" },
      { name: "Старый город", image: "img/edinburgh/e4.png" },
    ],
    author: "triptips",
    // Данные для аналитики
    totalUses: 8,
    subscriptionUses: 5,
    oneTimeUses: 3,
    subscriptionRevenue: 154.75,
    oneTimeRevenue: 104.97,
    totalRevenue: 259.72,
    createdAt: "2023-09-15",
    // Добавленные точки маршрута
    routePoints: [
      {
        name: "Замок Эдинбург",
        description:
          "Величественная крепость на вершине потухшего вулкана, доминирующая над городским пейзажем. История замка насчитывает более 1000 лет. Здесь хранятся шотландские королевские регалии и Камень Судьбы. С крепостных стен открывается панорамный вид на весь город.",
        coordinates: "55.9486, -3.1999",
        gallery: [
          "img/edinburgh/castle1.png",
          "img/edinburgh/castle2.png",
          "img/edinburgh/castle3.png",
          "img/edinburgh/castle4.png",
          "img/edinburgh/castle5.png",
        ],
      },
      {
        name: "Королевская миля",
        description:
          "Историческая улица длиной около мили, соединяющая замок Эдинбург и Холирудский дворец. Состоит из нескольких улиц: Каслхилл, Лонмаркет, Хай-стрит, Каннонгейт. Усеяна старинными зданиями, магазинами, пабами и достопримечательностями, отражающими многовековую историю города.",
        coordinates: "55.9501, -3.1883",
        gallery: [
          "img/edinburgh/royalmile1.png",
          "img/edinburgh/royalmile2.png",
          "img/edinburgh/royalmile3.png",
          "img/edinburgh/royalmile4.png",
        ],
      },
      {
        name: "Собор Святого Джайлса",
        description:
          "Главная церковь Церкви Шотландии в Эдинбурге, основанная в XII веке. Известна своей характерной короной-шпилем и великолепными витражами. Внутри находится часовня Ордена Чертополоха, высшего рыцарского ордена Шотландии.",
        coordinates: "55.9496, -3.1914",
        gallery: ["img/edinburgh/stgiles1.png", "img/edinburgh/stgiles2.png", "img/edinburgh/stgiles3.png"],
      },
      {
        name: "Холирудский дворец",
        description:
          "Официальная резиденция британского монарха в Шотландии, расположенная в конце Королевской мили. Дворец связан с драматической историей Марии Стюарт. Посетители могут осмотреть исторические королевские апартаменты и руины аббатства Холируд XII века.",
        coordinates: "55.9524, -3.1719",
        gallery: [
          "img/edinburgh/holyrood1.png",
          "img/edinburgh/holyrood2.png",
          "img/edinburgh/holyrood3.png",
          "img/edinburgh/holyrood4.png",
        ],
      },
      {
        name: "Холм Калтон",
        description:
          "Холм в центре Эдинбурга с несколькими памятниками, включая Национальный монумент (незавершенная копия Парфенона), обсерваторию и монумент Нельсона. Отсюда открывается один из лучших панорамных видов на город, замок и залив Ферт-оф-Форт.",
        coordinates: "55.9555, -3.1826",
        gallery: [
          "img/edinburgh/calton1.png",
          "img/edinburgh/calton2.png",
          "img/edinburgh/calton3.png",
          "img/edinburgh/calton4.png",
          "img/edinburgh/calton5.png",
        ],
      },
    ],
  },
]

export default routesData
