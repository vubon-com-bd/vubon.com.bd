import { TypeObject } from '../../common/types.types';
import { PRODUCT_TYPES } from '@vubon/shared-constants/src/business/product/product-type.constants';

export interface ProductType extends TypeObject {
  category: 'product';
  hasVariants: boolean;
  hasInventory: boolean;
  isPhysical: boolean;
  isDigital: boolean;
}

export type ProductTypeKey = keyof typeof PRODUCT_TYPES;
