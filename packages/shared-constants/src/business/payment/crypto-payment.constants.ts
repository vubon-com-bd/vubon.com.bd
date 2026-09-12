import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { PAYMENT_METHOD } from './payment-method.constants';
import { CURRENCY } from '../../common/currency.constants';

export const CRYPTO_PAYMENT = {
  TYPES: {
    ...COMMON_TYPES,
    ...PAYMENT_METHOD.TYPES,
    BITCOIN: 'bitcoin',
    ETHEREUM: 'ethereum',
    USDT: 'usdt',
    BNB: 'bnb',
    SOLANA: 'solana',
    RIPPLE: 'ripple',
  },
  PAYMENT_METHOD: { ...PAYMENT_METHOD },
  CURRENCY: { ...CURRENCY },
  SUPPORTED_CURRENCIES: ['BTC', 'ETH', 'USDT', 'BNB', 'SOL', 'XRP'],
  NETWORKS: ['ERC20', 'BEP20', 'TRC20', 'SOLANA', 'BITCOIN'],
  CONFIRMATION_REQUIRED: 3,
  TIMEOUT_MINUTES: 60,
  MIN_CONFIRMATION_BLOCKS: 6,
  MAX_TRANSACTION_AMOUNT: 1000000,
} as const;
