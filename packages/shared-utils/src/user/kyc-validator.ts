import { UserKyc } from '@vubon/shared-types';

// ডামি ফাংশন (প্রকৃত ইমপ্লিমেন্টেশন প্রয়োজন)
const isValidNID = (_nid: string): boolean => true;
const isValidTIN = (_tin: string): boolean => true;
const isValidBIN = (_bin: string): boolean => true;

export const validateKyc = (kyc: Partial<UserKyc>): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (kyc.documentType === 'nid' && !isValidNID(kyc.documentNumber || '')) {
    errors.push('Invalid NID number');
  }
  if (kyc.documentType === 'tin' && !isValidTIN(kyc.documentNumber || '')) {
    errors.push('Invalid TIN number');
  }
  if (kyc.documentType === 'bin' && !isValidBIN(kyc.documentNumber || '')) {
    errors.push('Invalid BIN number');
  }
  return { isValid: errors.length === 0, errors };
};
