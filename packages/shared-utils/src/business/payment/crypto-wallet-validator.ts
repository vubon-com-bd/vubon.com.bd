/**
 * Crypto Wallet Validator
 * ক্রিপ্টো ওয়ালেট ভ্যালিডেটর
 */

export interface CryptoWalletValidationResult {
  valid: boolean;
  currency?: string;
  errors: string[];
}

export interface CryptoWalletDetails {
  currency:
    'btc' | 'eth' | 'usdt' | 'bnb' | 'xrp' | 'ada' | 'sol' | 'dot' | 'doge' | 'shib' | 'other';
  address: string;
}

export const validateCryptoWallet = (
  details: CryptoWalletDetails
): CryptoWalletValidationResult => {
  const errors: string[] = [];

  // Currency validation
  const validCurrencies = [
    'btc',
    'eth',
    'usdt',
    'bnb',
    'xrp',
    'ada',
    'sol',
    'dot',
    'doge',
    'shib',
    'other',
  ];
  if (!validCurrencies.includes(details.currency)) {
    errors.push('Invalid cryptocurrency');
    return { valid: false, errors };
  }

  // Address validation by currency
  const patterns: Record<string, RegExp> = {
    btc: /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/,
    eth: /^0x[a-fA-F0-9]{40}$/,
    usdt: /^0x[a-fA-F0-9]{40}$/,
    bnb: /^bnb[0-9a-zA-Z]{39}$/,
    xrp: /^r[0-9a-zA-Z]{24,34}$/,
    ada: /^(?:addr|stake)[0-9a-zA-Z]{40,60}$/,
    sol: /^[1-9A-HJ-NP-Za-km-z]{32,44}$/,
    dot: /^[1-9A-HJ-NP-Za-km-z]{47,48}$/,
    doge: /^D{1}[5-9A-HJ-NP-U]{1}[1-9A-HJ-NP-Za-km-z]{32,34}$/,
    shib: /^0x[a-fA-F0-9]{40}$/,
  };

  const pattern = patterns[details.currency];
  if (pattern && !pattern.test(details.address)) {
    errors.push(`Invalid ${details.currency} wallet address`);
  }

  return {
    valid: errors.length === 0,
    currency: details.currency,
    errors,
  };
};

export const validateBitcoinAddress = (address: string): boolean => {
  return /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/.test(address);
};

export const validateEthereumAddress = (address: string): boolean => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};

export const validateUSDTAddress = (address: string): boolean => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};

export const validateSolanaAddress = (address: string): boolean => {
  return /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(address);
};

export const maskCryptoAddress = (address: string): string => {
  if (address.length <= 10) {
    return address;
  }
  const prefix = address.slice(0, 6);
  const suffix = address.slice(-4);
  return `${prefix}...${suffix}`;
};
