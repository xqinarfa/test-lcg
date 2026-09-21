import { BoardTile, ChallengeDeck, FaqItem, PainPoint, GameplayStep, FeaturePillar } from '../types';

export const boardTiles: BoardTile[] = [
  {
    name: 'Pemanasan Santai',
    tag: 'Obrolan Mesra',
    mission: 'Pegang kedua tangan pasangan, tatap matanya selama 30 detik tanpa kata, lalu ceritakan satu hal yang paling kamu kagumi darinya minggu ini.',
    rule: 'Aturan: Pasangan hanya mendengarkan sambil menatap mata tanpa memotong.',
    duration: '1 Menit',
    intensity: 1,
  },
  {
    name: 'Bicara Jujur',
    tag: 'Kejujuran Intim',
    mission: 'Ceritakan satu fantasi atau sentuhan yang diam-diam selalu kamu nantikan saat kita sedang berduaan di kamar.',
    rule: 'Aturan: Suasana santai dan tanpa penghakiman sama sekali.',
    duration: '2 Menit',
    intensity: 1,
  },
  {
    name: 'Sentuhan Lembut',
    tag: 'Foreplay Perlahan',
    mission: 'Berikan ciuman lembut di sepanjang garis rahang dan leher pasangan dengan tempo perlahan, tanpa sentuhan tangan.',
    rule: 'Aturan: Pasangan yang dicium menutup mata dan menarik napas dalam.',
    duration: '60 Detik',
    intensity: 2,
  },
  {
    name: 'Pijatan Relaksasi',
    tag: 'Sentuhan Fisik',
    mission: 'Pijat lembut pundak dan tengkuk leher pasangan untuk melepaskan kepenatan seharian sebelum masuk ke babak berikutnya.',
    rule: 'Aturan: Gunakan ibu jari secara perlahan dari leher turun ke bahu.',
    duration: '3 Menit',
    intensity: 2,
  },
  {
    name: 'Tantangan Sensual',
    tag: 'Tantangan Ranjang',
    mission: 'Lepaskan satu helai pakaian pasangan hanya dengan satu tangan sambil tetap menjaga kontak mata berdua.',
    rule: 'Aturan: Lakukan dengan tempo lambat tanpa terburu-buru.',
    duration: '2 Menit',
    intensity: 3,
  },
  {
    name: 'Kamar Puncak',
    tag: 'Eksplorasi Puncak',
    mission: 'Tentukan posisi atau variasi favorit berdua untuk menutup permainan malam ini dengan keintiman penuh.',
    rule: 'Aturan: Nikmati momen berdua sepuasnya tanpa batasan waktu.',
    duration: 'Tanpa Batas',
    intensity: 3,
  },
];

export const challengeDecks: ChallengeDeck[] = [
  {
    category: 'Deep Connection',
    title: 'Obrolan Intim & Rahasia',
    cards: [
      {
        prompt: 'Ceritakan satu momen saat kamu merasa paling dicintai dan diinginkan oleh pasanganmu tahun ini.',
        rule: 'Aturan: Pasangan hanya mendengarkan tanpa memotong selama 2 menit.',
        duration: '2 Menit',
        intensity: 1,
      },
      {
        prompt: 'Apa satu hal baru yang ingin kamu coba dalam hubungan intim kita, tetapi selama ini belum sempat kamu katakan?',
        rule: 'Aturan: Tanggapi dengan keterbukaan dan rasa ingin tahu.',
        duration: 'Bebas',
        intensity: 1,
      },
      {
        prompt: 'Ungkapkan kenangan ranjang paling berkesan sejak malam pertama yang selalu teringat hingga kini.',
        rule: 'Aturan: Ceritakan dengan detail perasaanmu saat itu.',
        duration: '3 Menit',
        intensity: 2,
      },
    ],
  },
  {
    category: 'Sensual Touch',
    title: 'Pemanasan & Sentuhan Lembut',
    cards: [
      {
        prompt: 'Berikan pijatan relaksasi pada tengkuk dan bahu pasangan, lalu bisikkan bagian tubuh mana yang paling ingin kamu sentuh malam ini.',
        rule: 'Aturan: Pasangan menutup mata dan fokus menikmati sentuhan.',
        duration: '3 Menit',
        intensity: 2,
      },
      {
        prompt: 'Telusuri garis bibir, leher, dan dada pasangan hanya dengan menggunakan ujung jari secara perlahan.',
        rule: 'Aturan: Pasangan tidak boleh bergerak atau berbicara.',
        duration: '2 Menit',
        intensity: 2,
      },
      {
        prompt: 'Gunakan kain atau dasi untuk menutup mata pasangan, lalu berikan 3 ciuman di area tubuh yang berbeda.',
        rule: 'Aturan: Pasangan harus menebak di mana setiap ciuman mendarat.',
        duration: '3 Menit',
        intensity: 3,
      },
    ],
  },
  {
    category: 'Playful Dare',
    title: 'Tantangan Ranjang Spontan',
    cards: [
      {
        prompt: 'Lepaskan satu helai pakaian pasangan hanya dengan menggunakan satu tangan, sambil menatap matanya tanpa tertawa.',
        rule: 'Aturan: Jika gagal atau tertawa, gantian pasangan yang menentukan giliran.',
        duration: 'Bebas',
        intensity: 3,
      },
      {
        prompt: 'Bisikkan ke telinga pasangan tiga kata nakal yang mendeskripsikan apa yang akan terjadi selanjutnya di tempat tidur.',
        rule: 'Aturan: Nada suara harus pelan dan menggoda.',
        duration: '1 Menit',
        intensity: 3,
      },
      {
        prompt: 'Posisikan pasangan di pangkuanmu, lalu peluk erat selama 60 detik sambil bernapas dengan ritme yang sama.',
        rule: 'Aturan: Rasakan detak jantung satu sama lain.',
        duration: '1 Menit',
        intensity: 2,
      },
    ],
  },
  {
    category: 'Secret Fantasy',
    title: 'Eksplorasi Berdua',
    cards: [
      {
        prompt: 'Ungkapkan satu skenario atau posisi baru yang selama ini membuatmu penasaran untuk dicoba bersama malam ini.',
        rule: 'Aturan: Keduanya harus menyetujui batas kenyamanan sebelum memulai.',
        duration: 'Kesepakatan',
        intensity: 3,
      },
      {
        prompt: 'Tentukan satu peran sederhana untuk dimainkan selama 10 menit ke depan (misal: orang asing yang baru bertemu di hotel).',
        rule: 'Aturan: Tidak boleh memanggil dengan nama asli selama peran berlangsung.',
        duration: '10 Menit',
        intensity: 3,
      },
      {
        prompt: 'Beri izin pasanganmu untuk mengendalikan seluruh gerakan selama 5 menit berikutnya tanpa penolakan.',
        rule: 'Aturan: Nikmati sensasi menyerahkan kendali sepenuhnya.',
        duration: '5 Menit',
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
    answer: 'Transaksi diproses melalui payment gateway resmi dan hanya tertulis nama merchant digital netral (seperti LCG Digital atau QRIS Settlement). Sama sekali tidak ada kata-kata vulgar, ranjang, atau hal yang canggung di mutasi bank Anda.',
  },
  {
    question: 'Bagaimana kalau salah satu dari kami masih malu atau canggung?',
    answer: 'Justru permainan ini dirancang untuk situasi tersebut. Anda tidak langsung dihadapkan pada misi sensual. Babak awal berisi obrolan santai, pertanyaan nostalgia, dan tawa berdua untuk mencairkan suasana. Anda dan pasangan juga selalu bebas menyepakati tombol Lewati (Skip) kapan pun tanpa paksaan.',
  },
  {
    question: 'Harus pakai dua ponsel atau cukup satu HP berdua?',
    answer: 'Cukup satu ponsel atau tablet yang diletakkan di antara kalian di atas kasur atau sofa santai. Kalian bergantian melempar dadu dan membaca kartu yang muncul di layar. Lebih fokus berinteraksi tatap mata dan sentuhan fisik daripada sibuk memegang HP masing-masing.',
  },
  {
    question: 'Bisa dimainkan di iPhone atau cuma Android?',
    answer: 'Bisa di keduanya. Pengguna Android mendapatkan file APK siap pasang yang ringan dan cepat. Pengguna iPhone atau iPad mendapatkan akses Web App privat yang bisa disimpan ke Home Screen, berjalan dalam mode layar penuh tanpa bilah browser persis seperti aplikasi biasa.',
  },
  {
    question: 'Apakah ada biaya langganan bulanan setelah membeli?',
    answer: 'Tidak ada. Pembayaran Rp 88.000 adalah harga sekali bayar untuk akses selamanya. Tidak ada tagihan bulanan berulang, tidak ada fitur berbayar yang terkunci di dalam game, dan mencakup semua pembaruan kartu di masa mendatang.',
  },
  {
    question: 'Bagaimana kalau nanti ganti HP atau aplikasinya terhapus?',
    answer: 'Tautan akses dan lisensi Anda berlaku seumur hidup. Anda bisa mengunduh ulang kapan saja di perangkat baru. Jika butuh bantuan teknis, tim kami siap membantu melalui WhatsApp pribadi.',
  },
];

export const painPoints: PainPoint[] = [
  {
    title: 'Rutinitas dan Kelelahan Harian',
    description: 'Setelah seharian bekerja dan mengurus rumah tangga, sisa energi di malam hari sering kali hanya habis untuk menatap layar ponsel masing-masing tanpa koneksi nyata.',
  },
  {
    title: 'Keinginan yang Tertahan Rasa Canggung',
    description: 'Banyak hal intim yang ingin diutarakan atau dicoba, namun sulit diungkapkan karena ragu bagaimana memulainya tanpa membuat pasangan merasa dihakimi.',
  },
  {
    title: 'Variasi Hubungan yang Monoton',
    description: 'Aktivitas ranjang berubah menjadi agenda yang mudah ditebak. Papan permainan ini hadir sebagai pihak ketiga yang netral untuk membawa keseruan baru secara natural.',
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
    description: 'Temukan kartu truth or dare, petak sentuhan foreplay, hingga hadiah mesra yang membuat suasana mengalir tanpa paksaan.',
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
    description: 'Tantangan bertahap yang dibagi ke dalam 4 kategori khusus: obrolan mendalam, sentuhan pemanasan, tantangan ranjang, dan eksplorasi rahasia.',
  },
  {
    title: 'Timer Intim Otomatis',
    description: 'Setiap misi sentuhan fisik dilengkapi hitung mundur lembut, memberikan kepastian durasi yang menenangkan tanpa perlu memeriksa jam secara manual.',
  },
  {
    title: 'Mode Avatar Pasutri',
    description: 'Personalisasi avatar suami dan istri untuk representasi visual yang menyenangkan dan menambah keterikatan emosional di atas papan.',
  },
  {
    title: '100% Offline & Privat',
    description: 'Dapat dimainkan di mana saja tanpa memerlukan koneksi internet, menjamin seluruh momen intim kalian tetap tersimpan aman di kamar pribadi.',
  },
];
