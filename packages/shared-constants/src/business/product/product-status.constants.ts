import { STATUS as COMMON_STATUS } from '../../common/status.constants';

export const PRODUCT_STATUS = {
  ...COMMON_STATUS,
  DRAFT: 'draft',
  PUBLISHED: 'published',
  ARCHIVED: 'archived',
  OUT_OF_STOCK: 'out_of_stock',
  DISCONTINUED: 'discontinued',
} as const;
