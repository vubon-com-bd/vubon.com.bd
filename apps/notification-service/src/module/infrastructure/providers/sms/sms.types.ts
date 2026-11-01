/**
 * SMS Provider Types — Bangladesh Edition
 * @module notification-service/infrastructure/providers/sms
 *
 * Comprehensive BD telecom operator coverage:
 *  - Aggregators: SSLWireless, BulkSMSBD, MIMSMS, Alpha SMS
 *  - MNO Direct: Banglalink, Grameenphone, Robi, Airtel, Teletalk
 *  - International: Twilio, Vonage
 */

// ═══════════════ Provider Names ═══════════════
export type SmsProviderName =
  | 'sslwireless'
  | 'bulksmsbd'
  | 'mimsms'
  | 'alphasms'
  | 'banglalink'
  | 'grameenphone'
  | 'robi'
  | 'airtel'
  | 'teletalk'
  | 'twilio'
  | 'vonage';

// ═══════════════ Bangladesh Mobile Network Operators ═══════════════
export type BdMobileNetwork =
  | 'grameenphone' // GP
  | 'robi'         // Robi
  | 'airtel'       // Airtel (Robi group)
  | 'banglalink'   // BL
  | 'teletalk'     // TT
  | 'unknown';

// ═══════════════ BD Prefix → MNO mapping ═══════════════
/**
 * Bangladesh mobile number prefixes (after +880 1):
 * GP: 3, 7, 13, 17
 * Robi: 6, 8, 14, 16, 18
 * Airtel: 5, 15, 19
 * Banglalink: 4, 9, 11, 14 (shared)
 * Teletalk: 1 (before Mar 2020), 2 (new), 3 (new), 5 (new)
 */
export const BD_MNO_PREFIXES: Readonly<Record<string, BdMobileNetwork>> = Object.freeze({
  '013': 'grameenphone',
  '017': 'grameenphone',
  '019': 'grameenphone',
  '018': 'robi',
  '016': 'robi',
  '015': 'airtel',
  '011': 'banglalink',
  '014': 'banglalink',
  '021': 'teletalk',
  '031': 'teletalk',
  '041': 'teletalk',
  '051': 'teletalk',
} as const);

// ═══════════════ Config shape ═══════════════
export interface SmsProviderConfig {
  readonly name: SmsProviderName;
  readonly enabled: boolean;
  readonly priority: number;
  readonly supportsUnicode: boolean;
  readonly supportsDeliveryReport: boolean;
  readonly maxLength: number;
  readonly senderIdMaxLength: number;
}

// ═══════════════ Provider metadata (BD) ═══════════════
export const SMS_PROVIDER_METADATA: Readonly<
  Record<SmsProviderName, Omit<SmsProviderConfig, 'name' | 'enabled'>>
> = Object.freeze({
  sslwireless: {
    priority: 1,
    supportsUnicode: true,
    supportsDeliveryReport: true,
    maxLength: 160,
    senderIdMaxLength: 11,
  },
  bulksmsbd: {
    priority: 2,
    supportsUnicode: true,
    supportsDeliveryReport: true,
    maxLength: 160,
    senderIdMaxLength: 11,
  },
  mimsms: {
    priority: 3,
    supportsUnicode: true,
    supportsDeliveryReport: true,
    maxLength: 160,
    senderIdMaxLength: 11,
  },
  alphasms: {
    priority: 4,
    supportsUnicode: true,
    supportsDeliveryReport: true,
    maxLength: 160,
    senderIdMaxLength: 11,
  },
  banglalink: {
    priority: 5,
    supportsUnicode: true,
    supportsDeliveryReport: true,
    maxLength: 160,
    senderIdMaxLength: 11,
  },
  grameenphone: {
    priority: 5,
    supportsUnicode: true,
    supportsDeliveryReport: true,
    maxLength: 160,
    senderIdMaxLength: 11,
  },
  robi: {
    priority: 5,
    supportsUnicode: true,
    supportsDeliveryReport: true,
    maxLength: 160,
    senderIdMaxLength: 11,
  },
  airtel: {
    priority: 5,
    supportsUnicode: true,
    supportsDeliveryReport: true,
    maxLength: 160,
    senderIdMaxLength: 11,
  },
  teletalk: {
    priority: 6,
    supportsUnicode: true,
    supportsDeliveryReport: false,
    maxLength: 160,
    senderIdMaxLength: 11,
  },
  twilio: {
    priority: 10,
    supportsUnicode: true,
    supportsDeliveryReport: true,
    maxLength: 160,
    senderIdMaxLength: 11,
  },
  vonage: {
    priority: 11,
    supportsUnicode: true,
    supportsDeliveryReport: true,
    maxLength: 160,
    senderIdMaxLength: 11,
  },
});

// ═══════════════ Number detection helpers ═══════════════
/**
 * Detect Bangladesh MNO from phone number.
 * Accepts: +8801XXXXXXXXX, 8801XXXXXXXXX, 01XXXXXXXXX, 1XXXXXXXXX
 */
export function detectBdMobileNetwork(phone: string): BdMobileNetwork {
  const digits = phone.replace(/\D/g, '');

  let local: string;
  if (digits.startsWith('880')) local = digits.slice(3); // strip country code
  else if (digits.startsWith('0')) local = digits.slice(1); // strip leading 0
  else if (digits.startsWith('1') && digits.length === 10) local = digits;
  else return 'unknown';

  if (local.length !== 10) return 'unknown';

  const prefix = `0${local.slice(0, 2)}`; // e.g. '017' from '17XXXXXXXX'
  return BD_MNO_PREFIXES[prefix] ?? 'unknown';
}

/**
 * Check if phone number is a Bangladesh mobile number।
 */
export function isBdMobileNumber(phone: string): boolean {
  return detectBdMobileNetwork(phone) !== 'unknown';
}

/**
 * Normalize BD phone to E.164 format (+8801XXXXXXXXX)।
 */
export function normalizeBdPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.startsWith('880')) return `+${digits}`;
  if (digits.startsWith('0')) return `+880${digits.slice(1)}`;
  if (digits.startsWith('1') && digits.length === 10) return `+880${digits}`;
  return phone;
}

/**
 * Check whether the SMS content requires unicode encoding (bangla)।
 */
export function isUnicodeSms(text: string): boolean {
  return !/^[\x00-\x7F]*$/.test(text);
}
