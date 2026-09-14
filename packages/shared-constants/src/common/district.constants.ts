export const DISTRICT = {
  DHAKA: 'dhaka',
  GAZIPUR: 'gazipur',
  NARAYANGANJ: 'narayanganj',
  CHITTAGONG: 'chittagong',
  COX_BAZAR: 'cox_bazar',
  RAJSHAHI: 'rajshahi',
  KHULNA: 'khulna',
  SYLHET: 'sylhet',
  BARISHAL: 'barishal',
  RANGPUR: 'rangpur',
  MYMENSINGH: 'mymensingh',
  BOGRA: 'bogra',
  JESSORE: 'jessore',
  CUMILLA: 'cumilla',
  NARAYANGANJ_SADAR: 'narayanganj_sadar',
  FARIDPUR: 'faridpur',
  TANGAIL: 'tangail',
  KUSHTIA: 'kushtia',
  NOAKHALI: 'noakhali',
  FENI: 'feni',
} as const;

export type DistrictType = (typeof DISTRICT)[keyof typeof DISTRICT];
