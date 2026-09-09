import { USER_KYC } from '@vubon/shared-constants/src/user/user-kyc.constants';

export interface UserKyc {
  type: string;
  documentType: string;
  documentNumber: string;
  documentImage: string;
  status: 'pending' | 'approved' | 'rejected';
}

export const validateNID = (nid: string): boolean => {
  return nid.length === 10 || nid.length === 17;
};

export const validateTIN = (tin: string): boolean => {
  return tin.length === 9 || tin.length === 12;
};

export const validateBIN = (bin: string): boolean => {
  return bin.length === 11;
};

export const validateKyc = (kyc: Partial<UserKyc>): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (kyc.documentType === 'nid' && !validateNID(kyc.documentNumber || '')) {
    errors.push('Invalid NID number');
  }
  if (kyc.documentType === 'tin' && !validateTIN(kyc.documentNumber || '')) {
    errors.push('Invalid TIN number');
  }
  if (kyc.documentType === 'bin' && !validateBIN(kyc.documentNumber || '')) {
    errors.push('Invalid BIN number');
  }
  if (!kyc.documentImage) errors.push('Document image is required');
  if (kyc.type && !Object.keys(USER_KYC).includes(kyc.type)) {
    errors.push('Invalid KYC type');
  }
  return { isValid: errors.length === 0, errors };
};
