import { StatusObject } from '../../common/status.types';
import { PRODUCT_STATUS } from '@vubon/shared-constants/src/business/product/product-status.constants';

export interface ProductStatus extends StatusObject {
  category: 'product';
  isActive: boolean;
  isPublished: boolean;
  isArchived: boolean;
}

export type ProductStatusKey = keyof typeof PRODUCT_STATUS;
