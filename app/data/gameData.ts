import { ChallengeDeck, FaqItem, PainPoint, GameplayStep, FeaturePillar, TestimonialItem } from '../types';

export const challengeDecks: ChallengeDeck[] = [
  {
    category: 'Reward',
    title: 'Reward',
    frameImage: '/assets/images/card-reward-frame.jpg',
    accentColor: '#eab308',
    hasTimer: true,
    cards: [
      {
        prompt: 'Pasangan memijat bahumu pelan-pelan selama 30 detik.',
        rule: 'Aturan: Pasangan menutup mata dan menikmati pijatan tanpa terburu-buru.',
        duration: '30 Detik',
        intensity: 1,
      },
      {
        prompt: 'Pasangan mengusap punggungmu dengan lembut sambil berbisik kata-kata manis selama 10 detik.',
        rule: 'Aturan: Lakukan dengan ritme lembut dan tatap mata pasangan.',
        duration: '10 Detik',
        intensity: 2,
      },
      {
        prompt: 'Pasangan menggenggam kedua tanganmu erat dan mengecup keningmu selama 20 detik.',
        rule: 'Aturan: Nikmati kehangatan momen berdua dengan tenang.',
        duration: '20 Detik',
        intensity: 3,
      },
    ],
  },
  {
    category: 'Punishment',
    title: 'Punishment',
    frameImage: '/assets/images/card-punishment-frame.jpg',
    accentColor: '#ef4444',
    hasTimer: true,
    cards: [
      {
        prompt: 'Peluk pasanganmu dari belakang selama 1 menit tanpa bicara.',
        rule: 'Aturan: Pasangan hanya diam dan menikmati pelukannya.',
        duration: '1 Menit',
        intensity: 1,
      },
      {
        prompt: 'Tatap mata pasanganmu tanpa berkedip atau tertawa selama 10 detik.',
        rule: 'Aturan: Siapa yang tertawa duluan harus memberikan kecupan lembut.',
        duration: '10 Detik',
        intensity: 2,
      },
      {
        prompt: 'Berbaring berhadapan dan saling merangkul erat selama 1 menit.',
        rule: 'Aturan: Rasakan kehangatan pelukan berdua secara menyeluruh.',
        duration: '1 Menit',
        intensity: 3,
      },
    ],
  },
  {
    category: 'Truth',
    title: 'Truth',
    frameImage: '/assets/images/card-truth-frame.jpg',
    accentColor: '#06b6d4',
    hasTimer: false,
    cards: [
      {
        prompt: 'Pernah nggak kamu mimpi romantis tentang pasanganmu? Ceritain dong.',
        rule: 'Aturan: Ceritakan secara jujur dan pasangan mendengarkan dengan penuh perhatian.',
        intensity: 1,
      },
      {
        prompt: 'Kapan kamu pertama kali sadar bahwa kamu jatuh cinta pada pasanganmu?',
        rule: 'Aturan: Ungkapkan momen spesial tersebut dengan tulus dari hati.',
        intensity: 2,
      },
      {
        prompt: 'Hal apa yang paling kamu rindukan dari masa awal kalian pacaran?',
        rule: 'Aturan: Bagikan kenangan manis kalian berdua sambil berpegangan tangan.',
        intensity: 3,
      },
    ],
  },
  {
    category: 'Dare',
    title: 'Dare',
    frameImage: '/assets/images/card-dare-frame.jpg',
    accentColor: '#f97316',
    hasTimer: false,
    cards: [
      {
        prompt: 'Bisikkan satu pujian di telinga pasanganmu.',
        rule: 'Aturan: Nada suara harus pelan dan berbisik langsung di telinga.',
        intensity: 1,
      },
      {
        prompt: 'Cium pasanganmu di tempat yang udah lama nggak kamu cium.',
        rule: 'Aturan: Pasangan tidak boleh mengelak atau menolak titik ciuman.',
        intensity: 2,
      },
      {
        prompt: 'Gaya jadi model dan biar pasanganmu ambil fotonya.',
        rule: 'Aturan: Berpose dengan percaya diri dan ceria untuk koleksi privat berdua.',
        intensity: 3,
      },
    ],
  },
];

export const faqItems: FaqItem[] = [
  {
    question: 'Apakah aman dan tidak ada data pribadi yang bocor?',
    answer: 'Aman 100%. Game ini berjalan sepenuhnya secara offline langsung di ponsel Anda. Kami tidak mewajibkan registrasi akun, tidak meminta email pribadi, dan tidak meminta izin akses kamera, galeri, maupun mikrofon. Semua kartu tantangan dan riwayat bermain tersimpan lokal di perangkat Anda sendiri.',
  },
  {
    question: 'Nama apa yang muncul di mutasi rekening atau struk pembayaran?',
    answer: 'Transaksi diproses melalui payment gateway resmi dan hanya tertulis nama merchant digital netral (seperti LCG Digital atau QRIS Settlement). Sama sekali tidak ada kata-kata yang bikin canggung di mutasi bank Anda.',
  },
  {
    question: 'Bagaimana kalau salah satu dari kami masih malu atau canggung?',
    answer: 'Justru permainan ini dirancang untuk situasi tersebut. Anda tidak langsung dihadapkan pada misi yang lebih mesra. Babak awal berisi obrolan santai, pertanyaan nostalgia, dan tawa berdua untuk mencairkan suasana. Anda dan pasangan juga selalu bebas menyepakati tombol Lewati (Skip) kapan pun tanpa paksaan.',
  },
  {
    question: 'Harus pakai dua ponsel atau cukup satu HP berdua?',
    answer: 'Cukup satu ponsel atau tablet yang diletakkan di antara kalian di sofa atau tempat santai. Kalian bergantian melempar dadu dan membaca kartu yang muncul di layar. Lebih fokus berinteraksi dan bertatap mata daripada sibuk memegang HP masing-masing.',
  },
  {
    question: 'Bisa dimainkan di iPhone atau cuma Android?',
    answer: 'Bisa banget di keduanya! Pengguna iPhone atau iPad bisa langsung mengakses game ini melalui App Store (dan Web App privat). Sedangkan untuk pengguna Android, Anda mendapatkan paket file APK resmi yang 100% aman, privat, dan siap dipasang langsung dalam hitungan detik.',
  },
  {
    question: 'Apakah ada biaya langganan bulanan setelah membeli?',
    answer: 'Tidak ada. Pembayaran Rp 29.000 adalah harga sekali bayar untuk akses selamanya. Tidak ada tagihan bulanan berulang, tidak ada fitur berbayar yang terkunci di dalam game, dan mencakup semua pembaruan kartu di masa mendatang.',
  },
  {
    question: 'Bagaimana kalau nanti ganti HP atau aplikasinya terhapus?',
    answer: 'Tautan akses dan lisensi Anda berlaku seumur hidup. Anda bisa mengunduh ulang kapan saja di perangkat baru. Jika butuh bantuan teknis, tim kami siap membantu melalui WhatsApp pribadi.',
  },
];

export const painPoints: PainPoint[] = [
  {
    title: 'MAU MESRA, TAPI RITMENYA BEDA',
    description: 'Satu sudah siap, satunya masih butuh waktu buat santai dan ngobrol dulu. Bukan salah siapa-siapa, cuma ritmenya belum ketemu. Game ini kasih jeda yang pas lewat obrolan, tawa, dan sentuhan sederhana seperti pelukan atau pijat bahu.',
  },
  {
    title: 'SAMA-SAMA CANGGUNG, AKHIRNYA DIAM-DIAMAN',
    description: 'Mau mulai duluan tapi malu, takut dibilang aneh. Akhirnya dua-duanya diam dan suasana jadi kaku. Game ini mencairkan suasana jadi penuh tawa, obrolan, dan interaksi dua arah.',
  },
  {
    title: 'BOSEN RUTINITAS GITU-GITU AJA & KURANG SERU',
    description: 'Makan, nonton, lalu tidur. Malam yang itu-itu lagi tanpa ada petualangan baru. Lewat 120+ kartu tantangan Love Couple Games, setiap malam jadi momen penasaran yang bikin nagih terus!',
  },
];

export const gameplaySteps: GameplayStep[] = [
  {
    num: 1,
    title: 'Lempar Dadu di Papan Digital',
    description: 'Mulai langkah kalian di atas papan bernuansa romantis. Setiap petak memiliki warna dan kategori tantangan yang berbeda.',
  },
  {
    num: 2,
    title: 'Jalankan Misi di Setiap Petak',
    description: 'Temukan kartu truth or dare, petak sentuhan romantis, hingga hadiah mesra yang membuat suasana mengalir tanpa paksaan.',
  },
  {
    num: 3,
    title: 'Kustomisasi Karakter Avatar',
    description: 'Gunakan reward koin untuk mengubah tampilan avatar suami dan istri sesuai preferensi dan gaya favorit berdua.',
  },
];

export const featurePillars: FeaturePillar[] = [
  {
    title: '120+ Kartu Misi Terkurasi',
    description: 'Tantangan bertahap yang dibagi ke dalam 4 kategori khusus: obrolan mendalam, sentuhan romantis, tantangan seru, dan rahasia berdua.',
  },
  {
    title: 'Timer Otomatis',
    description: 'Setiap misi sentuhan fisik dilengkapi hitung mundur lembut, memberikan kepastian durasi yang menenangkan tanpa perlu memeriksa jam secara manual.',
  },
  {
    title: 'Mode Avatar Pasutri',
    description: 'Personalisasi avatar suami dan istri untuk representasi visual yang menyenangkan dan menambah keterikatan emosional di atas papan.',
  },
  {
    title: '100% Offline & Privat',
    description: 'Dapat dimainkan di mana saja tanpa memerlukan koneksi internet, menjamin seluruh momen kalian tetap privat di perangkat sendiri.',
  },
];

export const testimonials: TestimonialItem[] = [
  {
    id: 1,
    couple: 'Rina & Dimas',
    duration: 'Menikah 4 Tahun',
    city: 'Jakarta Selatan',
    category: 'foreplay',
    categoryLabel: 'Ritual Pasutri Sabar',
    rating: 5,
    timeAgo: 'Terverifikasi 3 hari lalu',
    quote: 'Awalnya mikir game ginian lebay. Tapi pas dicoba malam minggu kemarin, suami yang biasanya buru-buru, jadi sabar banget ikutin hitung mundur timer di petak sentuhan. Rasanya seperti pacaran lagi.',
    highlight: 'Suami jadi lebih sabar dan santai!',
    avatarText: 'RD',
    gameMoment: 'Petak #8 (Pijat Tengkuk 3 Menit) & Timer Halus',
    beforeState: 'Suami buru-buru selesai, suasana kurang rileks',
    afterState: 'Momen santai 20 menit, menikmati waktu berdua',
    helpfulCount: 342,
  },
  {
    id: 2,
    couple: 'Bagas & Nadia',
    duration: 'Menikah 2 Tahun',
    city: 'Surabaya',
    category: 'newlywed',
    categoryLabel: 'Istri Lebih Terbuka',
    rating: 5,
    timeAgo: 'Terverifikasi 1 minggu lalu',
    quote: 'Istri saya jujur pemalu banget, sering cuma diam karena canggung. Pas giliran kartu Bisikan Rahasia, suasananya mencair lewat tawa dulu. Setelah itu kami bisa ngobrol lebih terbuka tanpa takut dihakimi.',
    highlight: 'Istri yang pemalu jadi lebih terbuka!',
    avatarText: 'BN',
    gameMoment: 'Kartu Playful Dare: Bisikan 3 Kata Pujian',
    beforeState: 'Istri canggung dan pendiam, komunikasi kaku',
    afterState: 'Komunikasi berdua mengalir lepas, penuh tawa dan kehangatan',
    helpfulCount: 289,
  },
  {
    id: 3,
    couple: 'Ferry & Anita',
    duration: 'Menikah 7 Tahun',
    city: 'Bandung',
    category: 'mid-marriage',
    categoryLabel: 'Pernikahan 7 Tahun Kembali Hangat',
    rating: 5,
    timeAgo: 'Terverifikasi 2 minggu lalu',
    quote: 'Udah nikah 7 tahun, rutinitas berdua mulai hambar dan terasa kayak kewajiban formalitas. Game papan ini bikin kami berdua penasaran tiap lemparan dadu. Efeknya jauh lebih berasa daripada staycation hotel jutaan rupiah.',
    highlight: 'Mengubah kewajiban formalitas jadi momen yang ditunggu tiap malam!',
    avatarText: 'FA',
    gameMoment: 'Papan Dadu Digital: Petak Tantangan Spontan',
    beforeState: 'Rutinitas monoton sebulan sekali cuma karena kewajiban',
    afterState: 'Seminggu 3-4 kali main dengan rasa penasaran tinggi',
    helpfulCount: 418,
  },
  {
    id: 4,
    couple: 'dr. Hendra & Citra',
    duration: 'Menikah 9 Tahun',
    city: 'Yogyakarta',
    category: 'long-marriage',
    categoryLabel: 'Solusi Pasutri Pekerja Sibuk',
    rating: 5,
    timeAgo: 'Terverifikasi 3 minggu lalu',
    quote: 'Kami berdua sama-sama dokter dan sering pulang malam dalam keadaan capek mental. Biasanya langsung tidur punggung-punggungan. Dengan game ini, 10 menit pertama langsung mencairkan beban kerja jadi obrolan dan pelukan hangat.',
    highlight: 'Dari tidur punggung-punggungan jadi pelukan erat sebelum tidur!',
    avatarText: 'HC',
    gameMoment: 'Ronde Romantic Touch: Pijatan Lembut & Tatap Mata 60 Detik',
    beforeState: 'Kelelahan kerja mengurangi waktu ngobrol dan kebersamaan',
    afterState: 'Ritual dekompresi 15 menit yang menghangatkan suasana berdua',
    helpfulCount: 381,
  },
  {
    id: 5,
    couple: 'Maya & Reza',
    duration: 'Menikah 3 Tahun',
    city: 'Tangerang',
    category: 'foreplay',
    categoryLabel: 'Eksplorasi Keinginan Berdua',
    rating: 5,
    timeAgo: 'Terverifikasi 2 minggu lalu',
    quote: 'Mau minta hal baru tapi ragu pasangan tersinggung. Kartu rahasia di game ini jadi tameng yang pas: bukan kami yang minta, tapi peraturan game yang menyuruh. Hasilnya kami jadi lebih paham keinginan satu sama lain.',
    highlight: 'Bisa jujur soal keinginan masing-masing tanpa rasa malu!',
    avatarText: 'MR',
    gameMoment: 'Kartu Secret Challenge: Skenario Rahasia & Obrolan Santai',
    beforeState: 'Tertahan malu mengutarakan hal baru yang diinginkan',
    afterState: 'Lebih paham keinginan satu sama lain dengan nyaman berdua',
    helpfulCount: 265,
  },
  {
    id: 6,
    couple: 'Rio & Michelle',
    duration: 'Menikah 1 Tahun',
    city: 'Denpasar',
    category: 'newlywed',
    categoryLabel: 'Pondasi Kehangatan Pengantin Baru',
    rating: 5,
    timeAgo: 'Terverifikasi 1 bulan lalu',
    quote: 'Sebagai pengantin baru, kami masih saling menyesuaikan satu sama lain. Game ini santai banget karena ada tombol Lewati kapan pun, jadi gak ada rasa tertekan sama sekali. Sangat direkomendasikan buat pasangan muda.',
    highlight: 'Main santai tanpa rasa tertekan!',
    avatarText: 'RM',
    gameMoment: 'Fitur Tombol Skip & Penyesuaian Intensitas Level 1-3',
    beforeState: 'Takut canggung atau membuat pasangan tidak nyaman',
    afterState: 'Saling memahami preferensi masing-masing dengan santai',
    helpfulCount: 214,
  },
];


