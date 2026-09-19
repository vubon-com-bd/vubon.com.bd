export const UPAZILA = {
  SAVAR: 'savar',
  ASHULIA: 'ashulia',
  KERANIGANJ: 'keraniganj',
  GAZIPUR_SADAR: 'gazipur_sadar',
  KALIAKOIR: 'kaliakoir',
  TONGI: 'tongi',
  SONARGAON: 'sonargaon',
  ARAIHAZAR: 'araihazar',
  BANDAR: 'bandar',
  NARAYANGANJ_SADAR: 'narayanganj_sadar',
  MIRPUR: 'mirpur',
  MOHAMMADPUR: 'mohammadpur',
  GULSHAN: 'gulshan',
  BANANI: 'banani',
  UTTARA: 'uttara',
  MIRPUR_DHAKA: 'mirpur_dhaka',
} as const;

export type UpazilaType = (typeof UPAZILA)[keyof typeof UPAZILA];
