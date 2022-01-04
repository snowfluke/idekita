/** This files is used to store all the available badges and the tiering sequences */

const badges = {
  snowfluke: {
    name: "snowfluke",
    badge: "❄",
    desc: "Nama pengguna Github saya",
  },
  timidekita: {
    name: "timidekita",
    badge: "💡",
    desc: "Tim yang berpartisipasi dalam pembuatan awal iDekita",
  },
  kolaborator: {
    name: "kolaborator",
    badge: "💠",
    desc: "Orang yang berpartisipasi dalam pengembangan iDekita melalui repositori Github iDekita",
  },
  founder: {
    name: "founder",
    badge: "😎",
    desc: "Penemu dan pendiri sebuah perusahaan atau organisasi",
  },
  ceo: {
    name: "ceo",
    badge: "👤",
    desc: "CEO (Chief Executive Officer) seseorang yang memiliki posisi tertinggi di perusahaan",
  },
  adipati: {
    name: "adipati",
    badge: "👑",
    desc: "Gelar bangsawan untuk orang yang menjabat sebagai kepala wilayah yang tunduk dalam struktur pemerintahan kerajaan di Nusantara, Adipati di sini sebagai seorang pendukung website iDekita dan tunduk di bawah struktur manajemen iDekita",
  },
  ccreator: {
    name: "ccreator",
    badge: "🛠",
    desc: "Singkatan dari C = Category dan creator adalah pembuat",
  },
  astronomer: {
    name: "astronomer",
    badge: "👨‍🚀",
    desc: "Orang yang memiliki pemikiran seluas alam semesta, yang di sini berarti julukan bagi orang yang memiliki pandangan dalam membuat kategori baru",
  },
  pathfinder: {
    name: "pathfinder",
    badge: "📌",
    desc: "Orang yang memikirkan jalan-jalan untuk memudahkan orang-orang dalam mencari jalan (kategori) yang belum terfikirkan oleh orang lain",
  },
  buntel: {
    name: "buntel",
    badge: "🍬",
    desc: "Sebuah bungkusan, yang dimaksud di sini adalah seseorang yang digambarkan sebuah bungkus, bisa berarti sebuah bungkus ide-ide cemerlang atau hanya angin saja",
  },
  idekreator: {
    name: "idekreator",
    badge: "👨🏻‍💼",
    desc: "Orang yang membuat/menyampaikan sebuah ide-ide agar bisa dilihat oleh khayalak umum",
  },
  idekiawan: {
    name: "idekiawan",
    badge: "👨🏻‍🎓",
    desc: "Orang yang menggunakan otaknya untuk berfikir kreatif untuk menghasilkan ide-ide yang mungkin bermanfaat bagi khalayak umum",
  },
  idepedia: {
    name: "idepedia",
    badge: "👨🏻‍⚖️",
    desc: "Orang yang memiliki wawasan luas seputar ide-ide baik itu ide dari dirinya maupun ide yang dia dengar dari orang lain",
  },
  idemitable: {
    name: "idemitable",
    badge: "👨🏻‍🏭",
    desc: "Orang yang menempatkan dirinya sebagai sebuah ‘table’ atau meja  yang diatasnya terdapat ide-ide cemerlang",
  },
  ideamaster: {
    name: "ideamaster",
    badge: "🤴🏻",
    desc: "Sesuai dengan yang disematkan di belakang kata ide, yaitu master atau sang ahli, tentunya ahli dalam memikirkan sebuah ide Entah itu ide yang bermanfaat ataupun tidak",
  },
  reportidea: {
    name: "reportidea",
    badge: "🙅‍♂️",
    desc: "Orang atau perilaku untuk melaporkan sebuah ide orang lain yang dianggapnya tidak bermanfaat/tidak bermutu",
  },
  reportman: {
    name: "reportman",
    badge: "👮🏻‍♂️",
    desc: "Gabungan dari kata “report” & “man” yang artinya adalah seorang pelapor",
  },
  reporteeer: {
    name: "reporteeer",
    badge: "💂‍♂️",
    desc: "Diambil dari kata “reporter” yang berarti pelapor, terdapat 3 huruf ‘e’ yang berarti tingkatan ketiga di  urutan tier laporan",
  },
  sweeper: {
    name: "sweeper",
    badge: "👾",
    desc: "Bahasa inggris dari kata penyapu, di sini yang bertugas untuk menyapu ide-ide tidak bermutu atau tidak kreatif yang dianggap ‘sampah’",
  },
  judgernaut: {
    name: "judgernaut",
    badge: "🐻",
    desc: "Seorang hakim, seorang hakim tentu sudah memiliki banyak pengetahuan seputar apa yang harusnya dia hakimi, di sini berarti orang yang gemar menghakimi ide orang lain",
  },
  batamaster: {
    name: "batamaster",
    badge: "🤺",
    desc: "Diambil dari 2 kata ‘bata’ dan ‘master’, di mana sebuah bata adalah barang digunakan untuk bahan bangunan yang terbuat dari tanah liat lalu dipanaskan, dan maksud dari sebutan batamaster adalah orang yang memberi dinding pemisah antara pembuat ide-ide yang tidak bermanfaat/kreatif agar tidak terekspos ke khalayak umum",
  },
  dilirik: {
    name: "dilirik",
    badge: "🤨",
    desc: "Orang yang mencuri perhatian sehingga orang-orang mulai melirik",
  },
  disenengi: {
    name: "disenengi",
    badge: "😍",
    desc: "Dalam bahasa Indonesia kata ‘disenengi’ berarti disukai, yaitu orang yang disukai oleh banyak orang",
  },
  popular: {
    name: "popular",
    badge: "✨",
    desc: "Berbeda dengan kata terkenal, jika terkenal belum tentu disukai, tetapi jika popolar adalah sebutan bagi orang yang terkenal serta disukai oleh orang-orang",
  },
  contributor: {
    name: "contributor",
    badge: "🧰",
    desc: "Diakui oleh banyak orang sebagai kontributor, di sini dalam artian orang yang berkontribusi memberikan ide-idenya",
  },
  worldwide: {
    name: "worldwide",
    badge: "🌏",
    desc: "Dikenal oleh banyak orang tidak hanya satu negara, tapi sudah manca negara",
  },
  superstar: {
    name: "superstar",
    badge: "🌟",
    desc: "Mega bintang yang ketenarannya sudah di ambang batas tertinggi",
  },
  pocung: {
    name: "pocung",
    badge: "👻",
    desc: "Dalam artian lain kata ‘pocung’ adalah pocong, yaitu perjalanan terakhir manusia, tetapi semua ketenaran dan kemasyhurannya semasa hidup akan tetap diingat",
  },
  buddy: {
    name: "buddy",
    badge: "👦",
    desc: "Seseorang yang memiliki respect terhadap seseorang",
  },
  suwung: {
    name: "suwung",
    badge: "💁🏻‍♂️",
    desc: "Orang yang tidak memiliki pekerjaan atau dalam bahasa jawa yaitu ‘suwung’",
  },
  penyuka: {
    name: "penyuka",
    badge: "🤙",
    desc: "Seseorang yang menyukai hasil karya orang lain, dan mulai antusias dalam menunggu postingan-postingan yang lain",
  },
  maniac: {
    name: "maniac",
    badge: "👋",
    desc: "Seorang penyuka yang kesukaannya mulai berlebihan atau sangat antusias dan terkesan mulai mengerikan",
  },
  mahajari: {
    name: "mahajari",
    badge: "🤟",
    desc: "Seseorang yang memiliki jari dewa untuk menyukai setiap postingan yang ada, tanpa memperdulikan itu baik atau buruk",
  },
  teknogidea: {
    name: "teknogidea",
    badge: "👩🏻‍💻",
    desc: "Orang yang memiliki ide-ide seputar teknologi",
  },
  teknoddict: {
    name: "teknoddict",
    badge: "👨‍💻",
    desc: "Seseorang yang berambisi dalam teknologi",
  },
  teknofreak: {
    name: "teknofreak",
    badge: "🤯",
    desc: "Sebutan untuk orang yang sangat menyukai teknologi dan berambisi untuk mewujudkan segala cita-citanya dalam mencipatkan teknologi baru",
  },
  teknoboss: {
    name: "teknoboss",
    badge: "🧞",
    desc: "Gabungan dari kata ‘tekno’ dan ‘boss’, tekno yaitu teknologi sedangkan boss merujuk ke dalam sebutan dari raja para monster, di sini berarti sebutan bagi orang yang memiliki keahlian dalam bidang teknologi yang kemampuannya setara dengan boss para monster",
  },
  pertidea: {
    name: "pertidea",
    badge: "👩‍🌾",
    desc: "Orang yang peduli dalam bidang pertanian",
  },
  pertaddict: {
    name: "pertaddict",
    badge: "💪",
    desc: "Seseorang yang berambisi dalam kemajuan di bidang pertanian",
  },
  pertafreak: {
    name: "pertafreak",
    badge: "🦶",
    desc: "Sebutan bagi orang yang memiliki cita-cita untuk membuat bidang pertanian menjadi sangat maju dan memiliki terobosan-terobosan yang tidak terpikirkan oleh orang lain sebelumnya",
  },
  pertaboss: {
    name: "pertaboss",
    badge: "👴",
    desc: "Orang yang sudah sangat ahli di bidangnya dan ingin terus memajukkan bidang pertanian demi kemajuan umat manusia",
  },
  creatividea: {
    name: "creatividea",
    badge: "👨‍🔧",
    desc: "Orang yang berfikir kreatif",
  },
  creatividdict: {
    name: "creatividdict",
    badge: "🎭",
    desc: "Orang yang berpikiran kreatif namun lebih antusias",
  },
  creatifreak: {
    name: "creatifreak",
    badge: "🕵️",
    desc: "Sebutan bagi seseorang yang berpikir kreatif seperti orang aneh, karna semua hal tercipta dari kreatifitas berfikir dan sering dianggap aneh oleh kebanyakan orang",
  },
  creativiboss: {
    name: "creativiboss",
    badge: "👨🏻‍🎨",
    desc: "Orang yang berpikiran kreatif melebihi manusia biasa, dan setiap buah pemikirannya akan menciptakan sesuatu hal baru yang tidak pernah terfikirkan oleh orang biasa",
  },
  accnoob: {
    name: "accnoob",
    badge: "🤦",
    desc: "Seorang yang menekuni bidang akuntansi",
  },
  accruiser: {
    name: "accruiser",
    badge: "👲",
    desc: "Gabungan dari kata ‘acc’ = accountancy dan ‘cruiser’ = penjelajah, adalah orang yang mulai menjelajah dan bereksplorasi dalam bidang akuntasi",
  },
  accmaster: {
    name: "accmaster",
    badge: "👨🏻‍🏫",
    desc: "Seorang yang memiliki kemampuan di atas rata-rata dalam bidang akuntansi",
  },
  accqueentance: {
    name: "accqueentance",
    badge: "👸",
    desc: "Gabungan dari kata ‘acc’ = akun dan ‘queen’ = ratu dan ditambah -tance di belakang, yang berarti orang yang sangat ahli di bidang akuntansi dan kemampuan serta cara manajemen keuangan sangat tinggi seperti seorang ratu",
  },
  appkiddie: {
    name: "appkiddie",
    badge: "🙆‍♂️",
    desc: "Gabungan dari kata ‘app’ singkatan kata aplikasi dalam bahasa inggris serta ‘kiddie’ yaitu sebutan bagi seorang programmer pemula",
  },
  appmaker: {
    name: "appmaker",
    badge: "🧛",
    desc: "Seseorang yang sudah biasa membuat aplikasi",
  },
  appholic: {
    name: "appholic",
    badge: "🦸",
    desc: "Sebutan bagi orang yang sangat menyukai aplikasi",
  },
  appsodist: {
    name: "appsodist",
    badge: "🤹🏻",
    desc: "Gabungan dari kata ‘app’ yang berarti aplikasi dan ‘sodist’ yang diambil dari kata ‘rhapsodist’ yang digunakan sebagai sebutan orang ahli sastra, di sini appsodist berarti orang yang ahli dalam bahasa pemrograman",
  },
  tradetrain: {
    name: "tradetrain",
    badge: "🧝",
    desc: "Gabungan dari kata “trade” yang berarti transaksi dan “train” diambil dari kata “trainee” yang berarti pemula, adalah orang yang masih belajar di bidang trading",
  },
  tradewhaller: {
    name: "tradewhaller",
    badge: "👳‍♀️",
    desc: "Orang yang paham dan mengetahui struktur dan algoritma dalam dunia trading",
  },
  geemeinschaft: {
    name: "geemeinschaft",
    badge: "🧑‍🤝‍🧑",
    desc: "Gemeinschaft dalam istilah jerman yang berarti  rasa komunitas dan sosial yang tinggi.",
  },
  generalist: {
    name: "generalist",
    badge: "☠",
    desc: "Orang yang memegang banyak hal sekaligus dalam satu waktu dan bisa beradaptasi dengan pekerjaan apa pun",
  },
  tradeasy: {
    name: "tradeasy",
    badge: "🤵",
    desc: "Gabungan dari kata ‘trade’ dan ‘easy’ yang berarti adalah orang yang sudah ahli di bidang trading",
  },
  tradebweezard: {
    name: "tradebweezard",
    badge: "🧙‍♂️",
    desc: "Seseorang yang memiliki kemampuan seorang ‘wizard’, di mana seorang wizard atau penyihir memiliki otak dan kemampuan berfikir yang sangat cerdas, di sini berarti orang yang berkemampuan dalam mengelola trading di tingkatan seorang ahli",
  },
};

const tiering = `
supporter
👦buddy
💁🏻‍♂️suwung
🤙penyuka
👋maniac
🤟mahajari

sarjana
🥉Sarjana
🥈Magister
🥇Doktor

supported
🤨dilirik
😍disenengi
✨popular
🧰contributor
🌏worldwide
🌟superstar
👻pocung

journey
🍬Buntel
👨🏻‍💼idekreator
👨🏻‍🎓idekiawan
👨🏻‍⚖️idepedia
👨🏻‍🏭idemitable
🤴🏻ideamaster

reporter
🙅‍♂️reportidea
👮🏻‍♂️reportman
💂‍♂️reporteeer
👾sweeper
🐻judgernaut
🤺batamaster

category
🛠Ccreator
👨‍🚀astronomer
📌pathfinder!

tech
👩🏻‍💻teknogidea
👨‍💻teknoddict
🤯teknofreak
🧞teknoboss

farm
👩‍🌾pertidea
💪pertaddict
🦶pertafreak
👴pertaboss

creative
👨‍🔧creatividea
🎭creatividdict
🕵️creatifreak
👨🏻‍🎨creativiboss

health
🙋‍♂️farmasidea
👷farmasiddict
👨‍🔬farmasifreak
👨🏻‍⚕️farmasiboss

accountant
🤦accnoob
👲accruiser
👨🏻‍🏫accmaster
👸accqueentance

application
🙆‍♂️appkiddie
🧛appmaker
🦸🏻‍♂️appholic
🤹🏻appsodist

trading
🧝🏻‍♂️tradetrain
👳‍♀️tradewhaller
🤵tradeasy
🧙‍♂️tradebweezard`;

export { badges };
