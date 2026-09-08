import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { CURRENCY } from '../../common/currency.constants';
import { BANK_TRANSFER } from '../payment/bank-transfer.constants';

export const VENDOR_BANK_ACCOUNT = {
  TYPES: {
    ...COMMON_TYPES,
    ...BANK_TRANSFER.TYPES,
    SAVINGS: 'savings',
    CURRENT: 'current',
    CHECKING: 'checking',
  },
  CURRENCY: { ...CURRENCY },
  BANK_TRANSFER: { ...BANK_TRANSFER },
  SUPPORTED_CURRENCIES: ['BDT', 'USD', 'EUR', 'GBP'],
  ACCOUNT_TYPES: {
    PERSONAL: 'personal',
    BUSINESS: 'business',
    JOINT: 'joint',
  },
  MAX_ACCOUNTS: 5,
  ACCOUNT_NUMBER_LENGTH: 17,
  ROUTING_NUMBER_LENGTH: 9,
} as const;
