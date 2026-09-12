export interface CryptoWalletData {
  currency: string;
  address: string;
}

export const validateCryptoWallet = (
  wallet: Partial<CryptoWalletData>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!wallet.currency) errors.push('Currency is required');
  if (!wallet.address) errors.push('Wallet address is required');
  if (
    wallet.currency === 'BTC' &&
    wallet.address &&
    !/^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/.test(wallet.address)
  ) {
    errors.push('Invalid Bitcoin address');
  }
  if (wallet.currency === 'ETH' && wallet.address && !/^0x[a-fA-F0-9]{40}$/.test(wallet.address)) {
    errors.push('Invalid Ethereum address');
  }
  return { isValid: errors.length === 0, errors };
};
