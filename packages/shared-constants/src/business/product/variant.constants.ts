import { STATUS as COMMON_STATUS } from '../../common/status.constants';
import { TYPES as COMMON_TYPES } from '../../common/types.constants';

export const VARIANT = {
  STATUS: {
    ...COMMON_STATUS,
    IN_STOCK: 'in_stock',
    OUT_OF_STOCK: 'out_of_stock',
    BACKORDER: 'backorder',
  },
  TYPES: {
    ...COMMON_TYPES,
    SIZE: 'size',
    COLOR: 'color',
    MATERIAL: 'material',
    STYLE: 'style',
  },
} as const;
