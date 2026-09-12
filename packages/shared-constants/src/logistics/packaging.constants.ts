import { TYPES as COMMON_TYPES } from '../common/types.constants';
import { DOCUMENT } from '../common/document.constants';

export const PACKAGING = {
  TYPES: {
    ...COMMON_TYPES,
    BOX: 'box',
    BAG: 'bag',
    ENVELOPE: 'envelope',
    PALLET: 'pallet',
    CONTAINER: 'container',
    BUBBLE_WRAP: 'bubble_wrap',
    FOAM: 'foam',
  },
  FILE_TYPES: { ...DOCUMENT.TYPES },
  PACKAGING_MATERIALS: ['cardboard', 'plastic', 'wood', 'metal', 'glass', 'paper', 'bubble_wrap'],
  PACKAGING_SIZES: {
    XS: '1-10cm',
    S: '10-25cm',
    M: '25-50cm',
    L: '50-100cm',
    XL: '100-200cm',
    XXL: '200cm+',
  },
  MAX_WEIGHT_KG: 50,
  MIN_WEIGHT_KG: 0.01,
} as const;
