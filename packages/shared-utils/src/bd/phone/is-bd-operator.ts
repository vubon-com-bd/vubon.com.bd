/**
 * Detect BD mobile operator from phone prefix
 * @module shared-utils/bd/phone
 */
export type BdOperator = 'grameenphone' | 'robi' | 'banglalink' | 'teletalk' | 'airtel' | 'unknown';

const PREFIX_MAP: Record<string, BdOperator> = {
  '013': 'grameenphone',
  '017': 'grameenphone',
  '014': 'banglalink',
  '019': 'banglalink',
  '015': 'teletalk',
  '016': 'airtel',
  '018': 'robi',
};

export function isBdOperator(value: string): BdOperator {
  const digits = String(value).replace(/\D/g, '');
  const local = digits.startsWith('880')
    ? digits.slice(3)
    : digits.startsWith('0')
      ? digits
      : `0${digits}`;
  const prefix = local.slice(0, 3);
  return PREFIX_MAP[prefix] ?? 'unknown';
}
