import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { DATE_FORMAT } from '../../common/date-format.constants';

export const PRICE_HISTORY = {
  TYPES: {
    ...COMMON_TYPES,
    REGULAR: 'regular',
    SALE: 'sale',
    DISCOUNT: 'discount',
    BULK: 'bulk',
  },
  DATE_FORMAT: { ...DATE_FORMAT },
} as const;
