/**
 * District Constants — All 64 districts of Bangladesh
 * @module shared-constants/common
 *
 * 8 divisions × districts = 64 districts
 */

export const DISTRICT = {
  // ─────────────────────────────────────────────────
  // ঢাকা বিভাগ (Dhaka Division) — 13 districts
  // ─────────────────────────────────────────────────
  DHAKA: 'dhaka',
  FARIDPUR: 'faridpur',
  GAZIPUR: 'gazipur',
  GOPALGANJ: 'gopalganj',
  KISHOREGANJ: 'kishoreganj',
  MADARIPUR: 'madaripur',
  MANIKGANJ: 'manikganj',
  MUNSHIGANJ: 'munshiganj',
  NARAYANGANJ: 'narayanganj',
  NARSINGDI: 'narsingdi',
  RAJBARI: 'rajbari',
  SHARIATPUR: 'shariatpur',
  TANGAIL: 'tangail',

  // ─────────────────────────────────────────────────
  // চট্টগ্রাম বিভাগ (Chittagong Division) — 11 districts
  // ─────────────────────────────────────────────────
  CHITTAGONG: 'chittagong',
  BANDARBAN: 'bandarban',
  BRAHMANBARIA: 'brahmanbaria',
  CHANDPUR: 'chandpur',
  CUMILLA: 'cumilla',
  COX_BAZAR: 'cox_bazar',
  FENI: 'feni',
  KHAGRACHHARI: 'khagrachhari',
  LAKSHMIPUR: 'lakshmipur',
  NOAKHALI: 'noakhali',
  RANGAMATI: 'rangamati',

  // ─────────────────────────────────────────────────
  // রাজশাহী বিভাগ (Rajshahi Division) — 8 districts
  // ─────────────────────────────────────────────────
  RAJSHAHI: 'rajshahi',
  BOGRA: 'bogra',
  CHAPAINAWABGANJ: 'chapainawabganj',
  JOYPURHAT: 'joypurhat',
  NAOGAON: 'naogaon',
  NATORE: 'natore',
  PABNA: 'pabna',
  SIRAJGANJ: 'sirajganj',

  // ─────────────────────────────────────────────────
  // খুলনা বিভাগ (Khulna Division) — 10 districts
  // ─────────────────────────────────────────────────
  KHULNA: 'khulna',
  BAGERHAT: 'bagerhat',
  CHUADANGA: 'chuadanga',
  JESSORE: 'jessore',
  JHENAIDAH: 'jhenaidah',
  KUSHTIA: 'kushtia',
  MAGURA: 'magura',
  MEHERPUR: 'meherpur',
  NARAIL: 'narail',
  SATKHIRA: 'satkhira',

  // ─────────────────────────────────────────────────
  // বরিশাল বিভাগ (Barishal Division) — 6 districts
  // ─────────────────────────────────────────────────
  BARISHAL: 'barishal',
  BARGUNA: 'barguna',
  BHOLA: 'bhola',
  JHALOKATI: 'jhalokati',
  PATUAKHALI: 'patuakhali',
  PIROJPUR: 'pirojpur',

  // ─────────────────────────────────────────────────
  // সিলেট বিভাগ (Sylhet Division) — 4 districts
  // ─────────────────────────────────────────────────
  SYLHET: 'sylhet',
  HABIGANJ: 'habiganj',
  MOULVIBAZAR: 'moulvibazar',
  SUNAMGANJ: 'sunamganj',

  // ─────────────────────────────────────────────────
  // রংপুর বিভাগ (Rangpur Division) — 8 districts
  // ─────────────────────────────────────────────────
  RANGPUR: 'rangpur',
  DINAJPUR: 'dinajpur',
  GAIBANDHA: 'gaibandha',
  KURIGRAM: 'kurigram',
  LALMONIRHAT: 'lalmonirhat',
  NILPHAMARI: 'nilphamari',
  PANCHAGARH: 'panchagarh',
  THAKURGAON: 'thakurgaon',

  // ─────────────────────────────────────────────────
  // ময়মনসিংহ বিভাগ (Mymensingh Division) — 4 districts
  // ─────────────────────────────────────────────────
  MYMENSINGH: 'mymensingh',
  JAMALPUR: 'jamalpur',
  NETROKONA: 'netrokona',
  SHERPUR: 'sherpur',
} as const;

export type DistrictType = (typeof DISTRICT)[keyof typeof DISTRICT];

/**
 * Division → Districts mapping
 * Used for validation: does district X belong to division Y?
 */
export const DISTRICTS_BY_DIVISION = {
  dhaka: [
    DISTRICT.DHAKA,
    DISTRICT.FARIDPUR,
    DISTRICT.GAZIPUR,
    DISTRICT.GOPALGANJ,
    DISTRICT.KISHOREGANJ,
    DISTRICT.MADARIPUR,
    DISTRICT.MANIKGANJ,
    DISTRICT.MUNSHIGANJ,
    DISTRICT.NARAYANGANJ,
    DISTRICT.NARSINGDI,
    DISTRICT.RAJBARI,
    DISTRICT.SHARIATPUR,
    DISTRICT.TANGAIL,
  ],
  chittagong: [
    DISTRICT.CHITTAGONG,
    DISTRICT.BANDARBAN,
    DISTRICT.BRAHMANBARIA,
    DISTRICT.CHANDPUR,
    DISTRICT.CUMILLA,
    DISTRICT.COX_BAZAR,
    DISTRICT.FENI,
    DISTRICT.KHAGRACHHARI,
    DISTRICT.LAKSHMIPUR,
    DISTRICT.NOAKHALI,
    DISTRICT.RANGAMATI,
  ],
  rajshahi: [
    DISTRICT.RAJSHAHI,
    DISTRICT.BOGRA,
    DISTRICT.CHAPAINAWABGANJ,
    DISTRICT.JOYPURHAT,
    DISTRICT.NAOGAON,
    DISTRICT.NATORE,
    DISTRICT.PABNA,
    DISTRICT.SIRAJGANJ,
  ],
  khulna: [
    DISTRICT.KHULNA,
    DISTRICT.BAGERHAT,
    DISTRICT.CHUADANGA,
    DISTRICT.JESSORE,
    DISTRICT.JHENAIDAH,
    DISTRICT.KUSHTIA,
    DISTRICT.MAGURA,
    DISTRICT.MEHERPUR,
    DISTRICT.NARAIL,
    DISTRICT.SATKHIRA,
  ],
  barishal: [
    DISTRICT.BARISHAL,
    DISTRICT.BARGUNA,
    DISTRICT.BHOLA,
    DISTRICT.JHALOKATI,
    DISTRICT.PATUAKHALI,
    DISTRICT.PIROJPUR,
  ],
  sylhet: [
    DISTRICT.SYLHET,
    DISTRICT.HABIGANJ,
    DISTRICT.MOULVIBAZAR,
    DISTRICT.SUNAMGANJ,
  ],
  rangpur: [
    DISTRICT.RANGPUR,
    DISTRICT.DINAJPUR,
    DISTRICT.GAIBANDHA,
    DISTRICT.KURIGRAM,
    DISTRICT.LALMONIRHAT,
    DISTRICT.NILPHAMARI,
    DISTRICT.PANCHAGARH,
    DISTRICT.THAKURGAON,
  ],
  mymensingh: [
    DISTRICT.MYMENSINGH,
    DISTRICT.JAMALPUR,
    DISTRICT.NETROKONA,
    DISTRICT.SHERPUR,
  ],
} as const;

/**
 * Bengali names for each district
 */
export const DISTRICT_META = {
  dhaka: { name: 'Dhaka', nameBn: 'ঢাকা' },
  faridpur: { name: 'Faridpur', nameBn: 'ফরিদপুর' },
  gazipur: { name: 'Gazipur', nameBn: 'গাজীপুর' },
  gopalganj: { name: 'Gopalganj', nameBn: 'গোপালগঞ্জ' },
  kishoreganj: { name: 'Kishoreganj', nameBn: 'কিশোরগঞ্জ' },
  madaripur: { name: 'Madaripur', nameBn: 'মাদারীপুর' },
  manikganj: { name: 'Manikganj', nameBn: 'মানিকগঞ্জ' },
  munshiganj: { name: 'Munshiganj', nameBn: 'মুন্সিগঞ্জ' },
  narayanganj: { name: 'Narayanganj', nameBn: 'নারায়ণগঞ্জ' },
  narsingdi: { name: 'Narsingdi', nameBn: 'নরসিংদী' },
  rajbari: { name: 'Rajbari', nameBn: 'রাজবাড়ী' },
  shariatpur: { name: 'Shariatpur', nameBn: 'শরীয়তপুর' },
  tangail: { name: 'Tangail', nameBn: 'টাঙ্গাইল' },
  chittagong: { name: 'Chittagong', nameBn: 'চট্টগ্রাম' },
  bandarban: { name: 'Bandarban', nameBn: 'বান্দরবান' },
  brahmanbaria: { name: 'Brahmanbaria', nameBn: 'ব্রাহ্মণবাড়িয়া' },
  chandpur: { name: 'Chandpur', nameBn: 'চাঁদপুর' },
  cumilla: { name: 'Cumilla', nameBn: 'কুমিল্লা' },
  cox_bazar: { name: 'Cox\'s Bazar', nameBn: 'কক্সবাজার' },
  feni: { name: 'Feni', nameBn: 'ফেনী' },
  khagrachhari: { name: 'Khagrachhari', nameBn: 'খাগড়াছড়ি' },
  lakshmipur: { name: 'Lakshmipur', nameBn: 'লক্ষ্মীপুর' },
  noakhali: { name: 'Noakhali', nameBn: 'নোয়াখালী' },
  rangamati: { name: 'Rangamati', nameBn: 'রাঙ্গামাটি' },
  rajshahi: { name: 'Rajshahi', nameBn: 'রাজশাহী' },
  bogra: { name: 'Bogra', nameBn: 'বগুড়া' },
  chapainawabganj: { name: 'Chapainawabganj', nameBn: 'চাঁপাইনবাবগঞ্জ' },
  joypurhat: { name: 'Joypurhat', nameBn: 'জয়পুরহাট' },
  naogaon: { name: 'Naogaon', nameBn: 'নওগাঁ' },
  natore: { name: 'Natore', nameBn: 'নাটোর' },
  pabna: { name: 'Pabna', nameBn: 'পাবনা' },
  sirajganj: { name: 'Sirajganj', nameBn: 'সিরাজগঞ্জ' },
  khulna: { name: 'Khulna', nameBn: 'খুলনা' },
  bagerhat: { name: 'Bagerhat', nameBn: 'বাগেরহাট' },
  chuadanga: { name: 'Chuadanga', nameBn: 'চুয়াডাঙ্গা' },
  jessore: { name: 'Jessore', nameBn: 'যশোর' },
  jhenaidah: { name: 'Jhenaidah', nameBn: 'ঝিনাইদহ' },
  kushtia: { name: 'Kushtia', nameBn: 'কুষ্টিয়া' },
  magura: { name: 'Magura', nameBn: 'মাগুরা' },
  meherpur: { name: 'Meherpur', nameBn: 'মেহেরপুর' },
  narail: { name: 'Narail', nameBn: 'নড়াইল' },
  satkhira: { name: 'Satkhira', nameBn: 'সাতক্ষীরা' },
  barishal: { name: 'Barishal', nameBn: 'বরিশাল' },
  barguna: { name: 'Barguna', nameBn: 'বরগুনা' },
  bhola: { name: 'Bhola', nameBn: 'ভোলা' },
  jhalokati: { name: 'Jhalokati', nameBn: 'ঝালকাঠি' },
  patuakhali: { name: 'Patuakhali', nameBn: 'পটুয়াখালী' },
  pirojpur: { name: 'Pirojpur', nameBn: 'পিরোজপুর' },
  sylhet: { name: 'Sylhet', nameBn: 'সিলেট' },
  habiganj: { name: 'Habiganj', nameBn: 'হবিগঞ্জ' },
  moulvibazar: { name: 'Moulvibazar', nameBn: 'মৌলভীবাজার' },
  sunamganj: { name: 'Sunamganj', nameBn: 'সুনামগঞ্জ' },
  rangpur: { name: 'Rangpur', nameBn: 'রংপুর' },
  dinajpur: { name: 'Dinajpur', nameBn: 'দিনাজপুর' },
  gaibandha: { name: 'Gaibandha', nameBn: 'গাইবান্ধা' },
  kurigram: { name: 'Kurigram', nameBn: 'কুড়িগ্রাম' },
  lalmonirhat: { name: 'Lalmonirhat', nameBn: 'লালমনিরহাট' },
  nilphamari: { name: 'Nilphamari', nameBn: 'নীলফামারী' },
  panchagarh: { name: 'Panchagarh', nameBn: 'পঞ্চগড়' },
  thakurgaon: { name: 'Thakurgaon', nameBn: 'ঠাকুরগাঁও' },
  mymensingh: { name: 'Mymensingh', nameBn: 'ময়মনসিংহ' },
  jamalpur: { name: 'Jamalpur', nameBn: 'জামালপুর' },
  netrokona: { name: 'Netrokona', nameBn: 'নেত্রকোণা' },
  sherpur: { name: 'Sherpur', nameBn: 'শেরপুর' },
} as const;
