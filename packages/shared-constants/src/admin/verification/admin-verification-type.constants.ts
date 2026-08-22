/**
 * Admin Verification Type Constants
 * Detailed verification type definitions
 */

export const ADMIN_VERIFICATION_TYPE = {
  // Identity verification
  IDENTITY: 'identity',
  IDENTITY_DOCUMENT: 'identity_document',
  IDENTITY_CARD: 'identity_card',
  PASSPORT: 'passport',
  DRIVERS_LICENSE: 'drivers_license',
  NATIONAL_ID: 'national_id',
  VOTER_ID: 'voter_id',
  RESIDENCE_PERMIT: 'residence_permit',

  // Contact verification
  EMAIL: 'email',
  PHONE: 'phone',
  MOBILE: 'mobile',
  LANDLINE: 'landline',
  FAX: 'fax',

  // Address verification
  ADDRESS: 'address',
  HOME_ADDRESS: 'home_address',
  BUSINESS_ADDRESS: 'business_address',
  MAILING_ADDRESS: 'mailing_address',
  PERMANENT_ADDRESS: 'permanent_address',
  TEMPORARY_ADDRESS: 'temporary_address',

  // Financial verification
  BANK_ACCOUNT: 'bank_account',
  CREDIT_CARD: 'credit_card',
  DEBIT_CARD: 'debit_card',
  PAYMENT_METHOD: 'payment_method',
  TAX_ID: 'tax_id',
  TIN: 'tin',
  VAT: 'vat',

  // Document verification
  DOCUMENT: 'document',
  CONTRACT: 'contract',
  AGREEMENT: 'agreement',
  INVOICE: 'invoice',
  RECEIPT: 'receipt',
  CERTIFICATE: 'certificate',
  LICENSE: 'license',
  PERMIT: 'permit',

  // Biometric verification
  BIOMETRIC: 'biometric',
  FACE: 'face',
  FINGERPRINT: 'fingerprint',
  VOICE: 'voice',
  IRIS: 'iris',
  RETINA: 'retina',
  PALM: 'palm',
  HAND_GEOMETRY: 'hand_geometry',

  // Security verification
  TWO_FA: 'two_fa',
  MFA: 'mfa',
  OTP: 'otp',
  TOTP: 'totp',
  HOTP: 'hotp',
  SECURITY_KEY: 'security_key',
  SECURITY_TOKEN: 'security_token',
  SECURITY_QUESTION: 'security_question',

  // Device verification
  DEVICE: 'device',
  MOBILE_DEVICE: 'mobile_device',
  COMPUTER_DEVICE: 'computer_device',
  BROWSER: 'browser',
  OS: 'os',

  // Location verification
  LOCATION: 'location',
  GPS: 'gps',
  IP_ADDRESS: 'ip_address',
  GEO_IP: 'geo_ip',
  TIMEZONE: 'timezone',

  // Social verification
  SOCIAL: 'social',
  SOCIAL_MEDIA: 'social_media',
  FACEBOOK: 'facebook',
  GOOGLE: 'google',
  TWITTER: 'twitter',
  LINKEDIN: 'linkedin',
  GITHUB: 'github',
  MICROSOFT: 'microsoft',

  // Professional verification
  PROFESSIONAL: 'professional',
  EMPLOYMENT: 'employment',
  BUSINESS: 'business',
  TRADE_LICENSE: 'trade_license',
  PROFESSIONAL_LICENSE: 'professional_license',
  MEMBERSHIP: 'membership',

  // Academic verification
  ACADEMIC: 'academic',
  DEGREE: 'degree',
  DIPLOMA: 'diploma',
  CERTIFICATE_ACADEMIC: 'certificate_academic',
  TRANSCRIPT: 'transcript',
  STUDENT_ID: 'student_id',

  // Government verification
  GOVERNMENT: 'government',
  GOV_ID: 'gov_id',
  SSN: 'ssn',
  NIN: 'nin',
  PIN: 'pin',
  EIN: 'ein',

  // Behavioral verification
  BEHAVIORAL: 'behavioral',
  KEYSTROKE: 'keystroke',
  MOUSE_MOVEMENT: 'mouse_movement',
  TYPING_PATTERN: 'typing_pattern',
  NAVIGATION_PATTERN: 'navigation_pattern',

  // Knowledge verification
  KNOWLEDGE: 'knowledge',
  SECURITY_QUESTIONS: 'security_questions',
  PERSONAL_INFO: 'personal_info',
  ACCOUNT_INFO: 'account_info',

  // Possession verification
  POSSESSION: 'possession',
  PHYSICAL_TOKEN: 'physical_token',
  DIGITAL_TOKEN: 'digital_token',
  SMART_CARD: 'smart_card',
  USB_TOKEN: 'usb_token',
  NFC_TOKEN: 'nfc_token',

  // Inherent verification
  INHERENT: 'inherent',
  GENETIC: 'genetic',
  DNA: 'dna',
  BLOOD_TYPE: 'blood_type',
} as const;

export type AdminVerificationTypeDetail =
  (typeof ADMIN_VERIFICATION_TYPE)[keyof typeof ADMIN_VERIFICATION_TYPE];

export const ADMIN_VERIFICATION_TYPE_CATEGORIES: Record<AdminVerificationTypeDetail, string> = {
  // Identity verification
  [ADMIN_VERIFICATION_TYPE.IDENTITY]: 'identity',
  [ADMIN_VERIFICATION_TYPE.IDENTITY_DOCUMENT]: 'identity',
  [ADMIN_VERIFICATION_TYPE.IDENTITY_CARD]: 'identity',
  [ADMIN_VERIFICATION_TYPE.PASSPORT]: 'identity',
  [ADMIN_VERIFICATION_TYPE.DRIVERS_LICENSE]: 'identity',
  [ADMIN_VERIFICATION_TYPE.NATIONAL_ID]: 'identity',
  [ADMIN_VERIFICATION_TYPE.VOTER_ID]: 'identity',
  [ADMIN_VERIFICATION_TYPE.RESIDENCE_PERMIT]: 'identity',

  // Contact verification
  [ADMIN_VERIFICATION_TYPE.EMAIL]: 'contact',
  [ADMIN_VERIFICATION_TYPE.PHONE]: 'contact',
  [ADMIN_VERIFICATION_TYPE.MOBILE]: 'contact',
  [ADMIN_VERIFICATION_TYPE.LANDLINE]: 'contact',
  [ADMIN_VERIFICATION_TYPE.FAX]: 'contact',

  // Address verification
  [ADMIN_VERIFICATION_TYPE.ADDRESS]: 'address',
  [ADMIN_VERIFICATION_TYPE.HOME_ADDRESS]: 'address',
  [ADMIN_VERIFICATION_TYPE.BUSINESS_ADDRESS]: 'address',
  [ADMIN_VERIFICATION_TYPE.MAILING_ADDRESS]: 'address',
  [ADMIN_VERIFICATION_TYPE.PERMANENT_ADDRESS]: 'address',
  [ADMIN_VERIFICATION_TYPE.TEMPORARY_ADDRESS]: 'address',

  // Financial verification
  [ADMIN_VERIFICATION_TYPE.BANK_ACCOUNT]: 'financial',
  [ADMIN_VERIFICATION_TYPE.CREDIT_CARD]: 'financial',
  [ADMIN_VERIFICATION_TYPE.DEBIT_CARD]: 'financial',
  [ADMIN_VERIFICATION_TYPE.PAYMENT_METHOD]: 'financial',
  [ADMIN_VERIFICATION_TYPE.TAX_ID]: 'financial',
  [ADMIN_VERIFICATION_TYPE.TIN]: 'financial',
  [ADMIN_VERIFICATION_TYPE.VAT]: 'financial',

  // Document verification
  [ADMIN_VERIFICATION_TYPE.DOCUMENT]: 'document',
  [ADMIN_VERIFICATION_TYPE.CONTRACT]: 'document',
  [ADMIN_VERIFICATION_TYPE.AGREEMENT]: 'document',
  [ADMIN_VERIFICATION_TYPE.INVOICE]: 'document',
  [ADMIN_VERIFICATION_TYPE.RECEIPT]: 'document',
  [ADMIN_VERIFICATION_TYPE.CERTIFICATE]: 'document',
  [ADMIN_VERIFICATION_TYPE.LICENSE]: 'document',
  [ADMIN_VERIFICATION_TYPE.PERMIT]: 'document',

  // Biometric verification
  [ADMIN_VERIFICATION_TYPE.BIOMETRIC]: 'biometric',
  [ADMIN_VERIFICATION_TYPE.FACE]: 'biometric',
  [ADMIN_VERIFICATION_TYPE.FINGERPRINT]: 'biometric',
  [ADMIN_VERIFICATION_TYPE.VOICE]: 'biometric',
  [ADMIN_VERIFICATION_TYPE.IRIS]: 'biometric',
  [ADMIN_VERIFICATION_TYPE.RETINA]: 'biometric',
  [ADMIN_VERIFICATION_TYPE.PALM]: 'biometric',
  [ADMIN_VERIFICATION_TYPE.HAND_GEOMETRY]: 'biometric',

  // Security verification
  [ADMIN_VERIFICATION_TYPE.TWO_FA]: 'security',
  [ADMIN_VERIFICATION_TYPE.MFA]: 'security',
  [ADMIN_VERIFICATION_TYPE.OTP]: 'security',
  [ADMIN_VERIFICATION_TYPE.TOTP]: 'security',
  [ADMIN_VERIFICATION_TYPE.HOTP]: 'security',
  [ADMIN_VERIFICATION_TYPE.SECURITY_KEY]: 'security',
  [ADMIN_VERIFICATION_TYPE.SECURITY_TOKEN]: 'security',
  [ADMIN_VERIFICATION_TYPE.SECURITY_QUESTION]: 'security',

  // Device verification
  [ADMIN_VERIFICATION_TYPE.DEVICE]: 'device',
  [ADMIN_VERIFICATION_TYPE.MOBILE_DEVICE]: 'device',
  [ADMIN_VERIFICATION_TYPE.COMPUTER_DEVICE]: 'device',
  [ADMIN_VERIFICATION_TYPE.BROWSER]: 'device',
  [ADMIN_VERIFICATION_TYPE.OS]: 'device',

  // Location verification
  [ADMIN_VERIFICATION_TYPE.LOCATION]: 'location',
  [ADMIN_VERIFICATION_TYPE.GPS]: 'location',
  [ADMIN_VERIFICATION_TYPE.IP_ADDRESS]: 'location',
  [ADMIN_VERIFICATION_TYPE.GEO_IP]: 'location',
  [ADMIN_VERIFICATION_TYPE.TIMEZONE]: 'location',

  // Social verification
  [ADMIN_VERIFICATION_TYPE.SOCIAL]: 'social',
  [ADMIN_VERIFICATION_TYPE.SOCIAL_MEDIA]: 'social',
  [ADMIN_VERIFICATION_TYPE.FACEBOOK]: 'social',
  [ADMIN_VERIFICATION_TYPE.GOOGLE]: 'social',
  [ADMIN_VERIFICATION_TYPE.TWITTER]: 'social',
  [ADMIN_VERIFICATION_TYPE.LINKEDIN]: 'social',
  [ADMIN_VERIFICATION_TYPE.GITHUB]: 'social',
  [ADMIN_VERIFICATION_TYPE.MICROSOFT]: 'social',

  // Professional verification
  [ADMIN_VERIFICATION_TYPE.PROFESSIONAL]: 'professional',
  [ADMIN_VERIFICATION_TYPE.EMPLOYMENT]: 'professional',
  [ADMIN_VERIFICATION_TYPE.BUSINESS]: 'professional',
  [ADMIN_VERIFICATION_TYPE.TRADE_LICENSE]: 'professional',
  [ADMIN_VERIFICATION_TYPE.PROFESSIONAL_LICENSE]: 'professional',
  [ADMIN_VERIFICATION_TYPE.MEMBERSHIP]: 'professional',

  // Academic verification
  [ADMIN_VERIFICATION_TYPE.ACADEMIC]: 'academic',
  [ADMIN_VERIFICATION_TYPE.DEGREE]: 'academic',
  [ADMIN_VERIFICATION_TYPE.DIPLOMA]: 'academic',
  [ADMIN_VERIFICATION_TYPE.CERTIFICATE_ACADEMIC]: 'academic',
  [ADMIN_VERIFICATION_TYPE.TRANSCRIPT]: 'academic',
  [ADMIN_VERIFICATION_TYPE.STUDENT_ID]: 'academic',

  // Government verification
  [ADMIN_VERIFICATION_TYPE.GOVERNMENT]: 'government',
  [ADMIN_VERIFICATION_TYPE.GOV_ID]: 'government',
  [ADMIN_VERIFICATION_TYPE.SSN]: 'government',
  [ADMIN_VERIFICATION_TYPE.NIN]: 'government',
  [ADMIN_VERIFICATION_TYPE.PIN]: 'government',
  [ADMIN_VERIFICATION_TYPE.EIN]: 'government',

  // Behavioral verification
  [ADMIN_VERIFICATION_TYPE.BEHAVIORAL]: 'behavioral',
  [ADMIN_VERIFICATION_TYPE.KEYSTROKE]: 'behavioral',
  [ADMIN_VERIFICATION_TYPE.MOUSE_MOVEMENT]: 'behavioral',
  [ADMIN_VERIFICATION_TYPE.TYPING_PATTERN]: 'behavioral',
  [ADMIN_VERIFICATION_TYPE.NAVIGATION_PATTERN]: 'behavioral',

  // Knowledge verification
  [ADMIN_VERIFICATION_TYPE.KNOWLEDGE]: 'knowledge',
  [ADMIN_VERIFICATION_TYPE.SECURITY_QUESTIONS]: 'knowledge',
  [ADMIN_VERIFICATION_TYPE.PERSONAL_INFO]: 'knowledge',
  [ADMIN_VERIFICATION_TYPE.ACCOUNT_INFO]: 'knowledge',

  // Possession verification
  [ADMIN_VERIFICATION_TYPE.POSSESSION]: 'possession',
  [ADMIN_VERIFICATION_TYPE.PHYSICAL_TOKEN]: 'possession',
  [ADMIN_VERIFICATION_TYPE.DIGITAL_TOKEN]: 'possession',
  [ADMIN_VERIFICATION_TYPE.SMART_CARD]: 'possession',
  [ADMIN_VERIFICATION_TYPE.USB_TOKEN]: 'possession',
  [ADMIN_VERIFICATION_TYPE.NFC_TOKEN]: 'possession',

  // Inherent verification
  [ADMIN_VERIFICATION_TYPE.INHERENT]: 'inherent',
  [ADMIN_VERIFICATION_TYPE.GENETIC]: 'inherent',
  [ADMIN_VERIFICATION_TYPE.DNA]: 'inherent',
  [ADMIN_VERIFICATION_TYPE.BLOOD_TYPE]: 'inherent',
};

export const ADMIN_VERIFICATION_TYPE_LABELS_DETAIL: Record<AdminVerificationTypeDetail, string> = {
  // Identity verification
  [ADMIN_VERIFICATION_TYPE.IDENTITY]: 'Identity Verification',
  [ADMIN_VERIFICATION_TYPE.IDENTITY_DOCUMENT]: 'Identity Document',
  [ADMIN_VERIFICATION_TYPE.IDENTITY_CARD]: 'Identity Card',
  [ADMIN_VERIFICATION_TYPE.PASSPORT]: 'Passport',
  [ADMIN_VERIFICATION_TYPE.DRIVERS_LICENSE]: "Driver's License",
  [ADMIN_VERIFICATION_TYPE.NATIONAL_ID]: 'National ID',
  [ADMIN_VERIFICATION_TYPE.VOTER_ID]: 'Voter ID',
  [ADMIN_VERIFICATION_TYPE.RESIDENCE_PERMIT]: 'Residence Permit',

  // Contact verification
  [ADMIN_VERIFICATION_TYPE.EMAIL]: 'Email Verification',
  [ADMIN_VERIFICATION_TYPE.PHONE]: 'Phone Verification',
  [ADMIN_VERIFICATION_TYPE.MOBILE]: 'Mobile Verification',
  [ADMIN_VERIFICATION_TYPE.LANDLINE]: 'Landline Verification',
  [ADMIN_VERIFICATION_TYPE.FAX]: 'Fax Verification',

  // Address verification
  [ADMIN_VERIFICATION_TYPE.ADDRESS]: 'Address Verification',
  [ADMIN_VERIFICATION_TYPE.HOME_ADDRESS]: 'Home Address',
  [ADMIN_VERIFICATION_TYPE.BUSINESS_ADDRESS]: 'Business Address',
  [ADMIN_VERIFICATION_TYPE.MAILING_ADDRESS]: 'Mailing Address',
  [ADMIN_VERIFICATION_TYPE.PERMANENT_ADDRESS]: 'Permanent Address',
  [ADMIN_VERIFICATION_TYPE.TEMPORARY_ADDRESS]: 'Temporary Address',

  // Financial verification
  [ADMIN_VERIFICATION_TYPE.BANK_ACCOUNT]: 'Bank Account',
  [ADMIN_VERIFICATION_TYPE.CREDIT_CARD]: 'Credit Card',
  [ADMIN_VERIFICATION_TYPE.DEBIT_CARD]: 'Debit Card',
  [ADMIN_VERIFICATION_TYPE.PAYMENT_METHOD]: 'Payment Method',
  [ADMIN_VERIFICATION_TYPE.TAX_ID]: 'Tax ID',
  [ADMIN_VERIFICATION_TYPE.TIN]: 'TIN',
  [ADMIN_VERIFICATION_TYPE.VAT]: 'VAT',

  // Document verification
  [ADMIN_VERIFICATION_TYPE.DOCUMENT]: 'Document Verification',
  [ADMIN_VERIFICATION_TYPE.CONTRACT]: 'Contract',
  [ADMIN_VERIFICATION_TYPE.AGREEMENT]: 'Agreement',
  [ADMIN_VERIFICATION_TYPE.INVOICE]: 'Invoice',
  [ADMIN_VERIFICATION_TYPE.RECEIPT]: 'Receipt',
  [ADMIN_VERIFICATION_TYPE.CERTIFICATE]: 'Certificate',
  [ADMIN_VERIFICATION_TYPE.LICENSE]: 'License',
  [ADMIN_VERIFICATION_TYPE.PERMIT]: 'Permit',

  // Biometric verification
  [ADMIN_VERIFICATION_TYPE.BIOMETRIC]: 'Biometric Verification',
  [ADMIN_VERIFICATION_TYPE.FACE]: 'Face Recognition',
  [ADMIN_VERIFICATION_TYPE.FINGERPRINT]: 'Fingerprint',
  [ADMIN_VERIFICATION_TYPE.VOICE]: 'Voice Recognition',
  [ADMIN_VERIFICATION_TYPE.IRIS]: 'Iris Scan',
  [ADMIN_VERIFICATION_TYPE.RETINA]: 'Retina Scan',
  [ADMIN_VERIFICATION_TYPE.PALM]: 'Palm Scan',
  [ADMIN_VERIFICATION_TYPE.HAND_GEOMETRY]: 'Hand Geometry',

  // Security verification
  [ADMIN_VERIFICATION_TYPE.TWO_FA]: 'Two-Factor Authentication',
  [ADMIN_VERIFICATION_TYPE.MFA]: 'Multi-Factor Authentication',
  [ADMIN_VERIFICATION_TYPE.OTP]: 'One-Time Password',
  [ADMIN_VERIFICATION_TYPE.TOTP]: 'Time-based OTP',
  [ADMIN_VERIFICATION_TYPE.HOTP]: 'HMAC-based OTP',
  [ADMIN_VERIFICATION_TYPE.SECURITY_KEY]: 'Security Key',
  [ADMIN_VERIFICATION_TYPE.SECURITY_TOKEN]: 'Security Token',
  [ADMIN_VERIFICATION_TYPE.SECURITY_QUESTION]: 'Security Question',

  // Device verification
  [ADMIN_VERIFICATION_TYPE.DEVICE]: 'Device Verification',
  [ADMIN_VERIFICATION_TYPE.MOBILE_DEVICE]: 'Mobile Device',
  [ADMIN_VERIFICATION_TYPE.COMPUTER_DEVICE]: 'Computer Device',
  [ADMIN_VERIFICATION_TYPE.BROWSER]: 'Browser',
  [ADMIN_VERIFICATION_TYPE.OS]: 'Operating System',

  // Location verification
  [ADMIN_VERIFICATION_TYPE.LOCATION]: 'Location Verification',
  [ADMIN_VERIFICATION_TYPE.GPS]: 'GPS Location',
  [ADMIN_VERIFICATION_TYPE.IP_ADDRESS]: 'IP Address',
  [ADMIN_VERIFICATION_TYPE.GEO_IP]: 'Geo-IP',
  [ADMIN_VERIFICATION_TYPE.TIMEZONE]: 'Timezone',

  // Social verification
  [ADMIN_VERIFICATION_TYPE.SOCIAL]: 'Social Verification',
  [ADMIN_VERIFICATION_TYPE.SOCIAL_MEDIA]: 'Social Media',
  [ADMIN_VERIFICATION_TYPE.FACEBOOK]: 'Facebook',
  [ADMIN_VERIFICATION_TYPE.GOOGLE]: 'Google',
  [ADMIN_VERIFICATION_TYPE.TWITTER]: 'Twitter',
  [ADMIN_VERIFICATION_TYPE.LINKEDIN]: 'LinkedIn',
  [ADMIN_VERIFICATION_TYPE.GITHUB]: 'GitHub',
  [ADMIN_VERIFICATION_TYPE.MICROSOFT]: 'Microsoft',

  // Professional verification
  [ADMIN_VERIFICATION_TYPE.PROFESSIONAL]: 'Professional Verification',
  [ADMIN_VERIFICATION_TYPE.EMPLOYMENT]: 'Employment',
  [ADMIN_VERIFICATION_TYPE.BUSINESS]: 'Business',
  [ADMIN_VERIFICATION_TYPE.TRADE_LICENSE]: 'Trade License',
  [ADMIN_VERIFICATION_TYPE.PROFESSIONAL_LICENSE]: 'Professional License',
  [ADMIN_VERIFICATION_TYPE.MEMBERSHIP]: 'Membership',

  // Academic verification
  [ADMIN_VERIFICATION_TYPE.ACADEMIC]: 'Academic Verification',
  [ADMIN_VERIFICATION_TYPE.DEGREE]: 'Degree',
  [ADMIN_VERIFICATION_TYPE.DIPLOMA]: 'Diploma',
  [ADMIN_VERIFICATION_TYPE.CERTIFICATE_ACADEMIC]: 'Academic Certificate',
  [ADMIN_VERIFICATION_TYPE.TRANSCRIPT]: 'Transcript',
  [ADMIN_VERIFICATION_TYPE.STUDENT_ID]: 'Student ID',

  // Government verification
  [ADMIN_VERIFICATION_TYPE.GOVERNMENT]: 'Government Verification',
  [ADMIN_VERIFICATION_TYPE.GOV_ID]: 'Government ID',
  [ADMIN_VERIFICATION_TYPE.SSN]: 'Social Security Number',
  [ADMIN_VERIFICATION_TYPE.NIN]: 'National Insurance Number',
  [ADMIN_VERIFICATION_TYPE.PIN]: 'Personal Identification Number',
  [ADMIN_VERIFICATION_TYPE.EIN]: 'Employer Identification Number',

  // Behavioral verification
  [ADMIN_VERIFICATION_TYPE.BEHAVIORAL]: 'Behavioral Verification',
  [ADMIN_VERIFICATION_TYPE.KEYSTROKE]: 'Keystroke Dynamics',
  [ADMIN_VERIFICATION_TYPE.MOUSE_MOVEMENT]: 'Mouse Movement',
  [ADMIN_VERIFICATION_TYPE.TYPING_PATTERN]: 'Typing Pattern',
  [ADMIN_VERIFICATION_TYPE.NAVIGATION_PATTERN]: 'Navigation Pattern',

  // Knowledge verification
  [ADMIN_VERIFICATION_TYPE.KNOWLEDGE]: 'Knowledge Verification',
  [ADMIN_VERIFICATION_TYPE.SECURITY_QUESTIONS]: 'Security Questions',
  [ADMIN_VERIFICATION_TYPE.PERSONAL_INFO]: 'Personal Information',
  [ADMIN_VERIFICATION_TYPE.ACCOUNT_INFO]: 'Account Information',

  // Possession verification
  [ADMIN_VERIFICATION_TYPE.POSSESSION]: 'Possession Verification',
  [ADMIN_VERIFICATION_TYPE.PHYSICAL_TOKEN]: 'Physical Token',
  [ADMIN_VERIFICATION_TYPE.DIGITAL_TOKEN]: 'Digital Token',
  [ADMIN_VERIFICATION_TYPE.SMART_CARD]: 'Smart Card',
  [ADMIN_VERIFICATION_TYPE.USB_TOKEN]: 'USB Token',
  [ADMIN_VERIFICATION_TYPE.NFC_TOKEN]: 'NFC Token',

  // Inherent verification
  [ADMIN_VERIFICATION_TYPE.INHERENT]: 'Inherent Verification',
  [ADMIN_VERIFICATION_TYPE.GENETIC]: 'Genetic',
  [ADMIN_VERIFICATION_TYPE.DNA]: 'DNA',
  [ADMIN_VERIFICATION_TYPE.BLOOD_TYPE]: 'Blood Type',
};

export function getAdminVerificationTypeCategory(type: AdminVerificationTypeDetail): string {
  return ADMIN_VERIFICATION_TYPE_CATEGORIES[type] || 'other';
}

export function getAdminVerificationTypeLabel(type: AdminVerificationTypeDetail): string {
  return ADMIN_VERIFICATION_TYPE_LABELS_DETAIL[type] || 'Unknown Type';
}

export function isBiometricType(type: AdminVerificationTypeDetail): boolean {
  return getAdminVerificationTypeCategory(type) === 'biometric';
}

export function isIdentityType(type: AdminVerificationTypeDetail): boolean {
  return getAdminVerificationTypeCategory(type) === 'identity';
}

export function isSecurityType(type: AdminVerificationTypeDetail): boolean {
  return getAdminVerificationTypeCategory(type) === 'security';
}

export function isFinancialType(type: AdminVerificationTypeDetail): boolean {
  return getAdminVerificationTypeCategory(type) === 'financial';
}

export function isDocumentType(type: AdminVerificationTypeDetail): boolean {
  return getAdminVerificationTypeCategory(type) === 'document';
}

export function isSocialType(type: AdminVerificationTypeDetail): boolean {
  return getAdminVerificationTypeCategory(type) === 'social';
}

export function isGovernmentType(type: AdminVerificationTypeDetail): boolean {
  return getAdminVerificationTypeCategory(type) === 'government';
}

export function getVerificationTypeCategory(type: AdminVerificationTypeDetail): string {
  return ADMIN_VERIFICATION_TYPE_CATEGORIES[type] || 'other';
}
