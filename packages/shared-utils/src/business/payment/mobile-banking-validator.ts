export interface MobileBankingData {
  provider: string;
  number: string;
}

export const isPaymentValidBkashNumber = (number: string): boolean => {
  return /^(01[3-9]\d{8})$/.test(number);
};

export const isPaymentValidNagadNumber = (number: string): boolean => {
  return /^(01[3-9]\d{8})$/.test(number);
};

export const isPaymentValidRocketNumber = (number: string): boolean => {
  return /^(01[3-9]\d{8})$/.test(number);
};

export const validateMobileBanking = (
  data: Partial<MobileBankingData>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!data.provider) errors.push('Provider is required');
  if (!data.number) errors.push('Mobile number is required');
  if (data.provider === 'bkash' && data.number && !isPaymentValidBkashNumber(data.number)) {
    errors.push('Invalid bKash number');
  }
  if (data.provider === 'nagad' && data.number && !isPaymentValidNagadNumber(data.number)) {
    errors.push('Invalid Nagad number');
  }
  if (data.provider === 'rocket' && data.number && !isPaymentValidRocketNumber(data.number)) {
    errors.push('Invalid Rocket number');
  }
  return { isValid: errors.length === 0, errors };
};
