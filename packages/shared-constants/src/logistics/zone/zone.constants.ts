/**
 * Zone Constants
 * Configuration for zones - Bangladesh based
 */

export const LOGISTICS_ZONE = {
  // Zone Types
  TYPES: {
    URBAN: 'urban',
    SUBURBAN: 'suburban',
    RURAL: 'rural',
    INDUSTRIAL: 'industrial',
    COMMERCIAL: 'commercial',
    RESIDENTIAL: 'residential',
    MIXED: 'mixed',
    SPECIAL: 'special',
  } as const,

  // Zone Divisions (Bangladesh)
  DIVISIONS: {
    DHAKA: 'dhaka',
    CHITTAGONG: 'chittagong',
    SYLHET: 'sylhet',
    RAJSHAHI: 'rajshahi',
    KHULNA: 'khulna',
    BARISHAL: 'barishal',
    RANGPUR: 'rangpur',
    MYMENSINGH: 'mymensingh',
  } as const,

  // Division Labels
  DIVISION_LABELS: {
    DHAKA: 'Dhaka Division',
    CHITTAGONG: 'Chittagong Division',
    SYLHET: 'Sylhet Division',
    RAJSHAHI: 'Rajshahi Division',
    KHULNA: 'Khulna Division',
    BARISHAL: 'Barishal Division',
    RANGPUR: 'Rangpur Division',
    MYMENSINGH: 'Mymensingh Division',
  } as const,

  // Zone Districts (Bangladesh)
  DISTRICTS: {
    DHAKA: 'dhaka',
    GAZIPUR: 'gazipur',
    NARAYANGANJ: 'narayanganj',
    TANGAIL: 'tangail',
    KISHOREGANJ: 'kishoreganj',
    MANIKGANJ: 'manikganj',
    MUNSHIGANJ: 'munshiganj',
    NARSINGDI: 'narsingdi',
    FARIDPUR: 'faridpur',
    GOPALGANJ: 'gopalganj',
    MADARIPUR: 'madaripur',
    RAJBARI: 'rajbari',
    SHARIATPUR: 'shariatpur',
    CHITTAGONG: 'chittagong',
    COX_BAZAR: 'cox_bazar',
    COMILLA: 'comilla',
    NOAKHALI: 'noakhali',
    FENI: 'feni',
    LAKSHMIPUR: 'lakshmipur',
    CHANDPUR: 'chandpur',
    BRAHMANBARIA: 'brahmanbaria',
    SYLHET: 'sylhet',
    MOULVIBAZAR: 'moulvibazar',
    HABIGANJ: 'habiganj',
    SUNAMGANJ: 'sunamganj',
    RAJSHAHI: 'rajshahi',
    PABNA: 'pabna',
    BOGRA: 'bogra',
    JOYPURHAT: 'joypurhat',
    NAOGAON: 'naogaon',
    NATORE: 'natore',
    CHAPAINAWABGANJ: 'chapainawabganj',
    SIRAJGANJ: 'sirajganj',
    KHULNA: 'khulna',
    BAGERHAT: 'bagerhat',
    SATKHIRA: 'satkhira',
    JESSORE: 'jessore',
    JENIDAHA: 'jenidaha',
    MAGURA: 'magura',
    NARAIL: 'narail',
    KUSHTIA: 'kushtia',
    MEHERPUR: 'meherpur',
    CHUADANGA: 'chuadanga',
    BARISHAL: 'barishal',
    PATUAKHALI: 'patuakhali',
    BHOLA: 'bhola',
    JHALOKATHI: 'jhalokathi',
    PIROJPUR: 'pirojpur',
    BARGUNA: 'barguna',
    RANGPUR: 'rangpur',
    DINAJPUR: 'dinajpur',
    GAIBANDHA: 'gaibandha',
    KURIGRAM: 'kurigram',
    LALMONIRHAT: 'lalmonirhat',
    NILPHAMARI: 'nilphamari',
    PANCHAGARH: 'panchagarh',
    THAKURGAON: 'thakurgaon',
    MYMENSINGH: 'mymensingh',
    JAMALPUR: 'jamalpur',
    SHERPUR: 'sherpur',
    NETROKONA: 'netrokona',
  } as const,

  // Zone Statuses
  STATUS: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    RESTRICTED: 'restricted',
    SPECIAL: 'special',
  } as const,

  // Zone Coverage
  COVERAGE: {
    URBAN: 100,
    SUBURBAN: 80,
    RURAL: 50,
    INDUSTRIAL: 90,
    COMMERCIAL: 95,
    RESIDENTIAL: 85,
    MIXED: 90,
    SPECIAL: 70,
  } as const,
} as const;

// Zone Types
export type LogisticsZoneType = (typeof LOGISTICS_ZONE.TYPES)[keyof typeof LOGISTICS_ZONE.TYPES];

// Zone Divisions
export type LogisticsZoneDivision =
  (typeof LOGISTICS_ZONE.DIVISIONS)[keyof typeof LOGISTICS_ZONE.DIVISIONS];

// Zone Districts
export type LogisticsZoneDistrict =
  (typeof LOGISTICS_ZONE.DISTRICTS)[keyof typeof LOGISTICS_ZONE.DISTRICTS];

// Zone Statuses
export type LogisticsZoneStatus =
  (typeof LOGISTICS_ZONE.STATUS)[keyof typeof LOGISTICS_ZONE.STATUS];

// Utility Functions
export function logisticsZoneGetTypeLabel(type: LogisticsZoneType): string {
  const labels: Record<LogisticsZoneType, string> = {
    [LOGISTICS_ZONE.TYPES.URBAN]: 'Urban',
    [LOGISTICS_ZONE.TYPES.SUBURBAN]: 'Suburban',
    [LOGISTICS_ZONE.TYPES.RURAL]: 'Rural',
    [LOGISTICS_ZONE.TYPES.INDUSTRIAL]: 'Industrial',
    [LOGISTICS_ZONE.TYPES.COMMERCIAL]: 'Commercial',
    [LOGISTICS_ZONE.TYPES.RESIDENTIAL]: 'Residential',
    [LOGISTICS_ZONE.TYPES.MIXED]: 'Mixed',
    [LOGISTICS_ZONE.TYPES.SPECIAL]: 'Special',
  };
  return labels[type] || 'Unknown';
}

export function logisticsZoneGetDivisionLabel(division: LogisticsZoneDivision): string {
  const labels: Record<LogisticsZoneDivision, string> = {
    [LOGISTICS_ZONE.DIVISIONS.DHAKA]: LOGISTICS_ZONE.DIVISION_LABELS.DHAKA,
    [LOGISTICS_ZONE.DIVISIONS.CHITTAGONG]: LOGISTICS_ZONE.DIVISION_LABELS.CHITTAGONG,
    [LOGISTICS_ZONE.DIVISIONS.SYLHET]: LOGISTICS_ZONE.DIVISION_LABELS.SYLHET,
    [LOGISTICS_ZONE.DIVISIONS.RAJSHAHI]: LOGISTICS_ZONE.DIVISION_LABELS.RAJSHAHI,
    [LOGISTICS_ZONE.DIVISIONS.KHULNA]: LOGISTICS_ZONE.DIVISION_LABELS.KHULNA,
    [LOGISTICS_ZONE.DIVISIONS.BARISHAL]: LOGISTICS_ZONE.DIVISION_LABELS.BARISHAL,
    [LOGISTICS_ZONE.DIVISIONS.RANGPUR]: LOGISTICS_ZONE.DIVISION_LABELS.RANGPUR,
    [LOGISTICS_ZONE.DIVISIONS.MYMENSINGH]: LOGISTICS_ZONE.DIVISION_LABELS.MYMENSINGH,
  };
  return labels[division] || 'Unknown';
}

export function logisticsZoneGetStatusLabel(status: LogisticsZoneStatus): string {
  const labels: Record<LogisticsZoneStatus, string> = {
    [LOGISTICS_ZONE.STATUS.ACTIVE]: 'Active',
    [LOGISTICS_ZONE.STATUS.INACTIVE]: 'Inactive',
    [LOGISTICS_ZONE.STATUS.RESTRICTED]: 'Restricted',
    [LOGISTICS_ZONE.STATUS.SPECIAL]: 'Special Zone',
  };
  return labels[status] || 'Unknown';
}

export function logisticsZoneGetCoverage(type: LogisticsZoneType): number {
  const coverage: Record<LogisticsZoneType, number> = {
    [LOGISTICS_ZONE.TYPES.URBAN]: LOGISTICS_ZONE.COVERAGE.URBAN,
    [LOGISTICS_ZONE.TYPES.SUBURBAN]: LOGISTICS_ZONE.COVERAGE.SUBURBAN,
    [LOGISTICS_ZONE.TYPES.RURAL]: LOGISTICS_ZONE.COVERAGE.RURAL,
    [LOGISTICS_ZONE.TYPES.INDUSTRIAL]: LOGISTICS_ZONE.COVERAGE.INDUSTRIAL,
    [LOGISTICS_ZONE.TYPES.COMMERCIAL]: LOGISTICS_ZONE.COVERAGE.COMMERCIAL,
    [LOGISTICS_ZONE.TYPES.RESIDENTIAL]: LOGISTICS_ZONE.COVERAGE.RESIDENTIAL,
    [LOGISTICS_ZONE.TYPES.MIXED]: LOGISTICS_ZONE.COVERAGE.MIXED,
    [LOGISTICS_ZONE.TYPES.SPECIAL]: LOGISTICS_ZONE.COVERAGE.SPECIAL,
  };
  return coverage[type] || LOGISTICS_ZONE.COVERAGE.RURAL;
}

export function logisticsZoneIsActive(status: LogisticsZoneStatus): boolean {
  return status === LOGISTICS_ZONE.STATUS.ACTIVE;
}

export function logisticsZoneIsOperational(status: LogisticsZoneStatus): boolean {
  const operationalStatuses: LogisticsZoneStatus[] = [
    LOGISTICS_ZONE.STATUS.ACTIVE,
    LOGISTICS_ZONE.STATUS.RESTRICTED,
  ];
  return operationalStatuses.includes(status);
}
