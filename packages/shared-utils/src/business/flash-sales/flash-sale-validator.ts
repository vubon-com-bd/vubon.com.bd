import { FLASH_SALE_STATUS } from '@vubon/shared-constants/src/business/flash-sales/flash-sale-status.constants';
import { FLASH_SALE_TYPE } from '@vubon/shared-constants/src/business/flash-sales/flash-sale-type.constants';

export interface FlashSaleInput {
  name: string;
  slug: string;
  status: string;
  type: string;
  discountPercentage: number;
  isActive: boolean;
  soldCount: number;
  totalLimit: number;
  schedule: { startDate: Date; endDate: Date };
}

export const isValidFlashSaleSlug = (slug: string): boolean => {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
};

export const validateFlashSale = (
  sale: Partial<FlashSaleInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!sale.name) errors.push('Flash sale name is required');
  if (!sale.slug) errors.push('Flash sale slug is required');
  if (sale.slug && !isValidFlashSaleSlug(sale.slug)) {
    errors.push('Invalid slug format');
  }
  if (sale.status && !Object.keys(FLASH_SALE_STATUS).includes(sale.status)) {
    errors.push('Invalid flash sale status');
  }
  if (sale.type && !Object.keys(FLASH_SALE_TYPE).includes(sale.type)) {
    errors.push('Invalid flash sale type');
  }
  if (
    sale.discountPercentage !== undefined &&
    (sale.discountPercentage < 0 || sale.discountPercentage > 100)
  ) {
    errors.push('Discount percentage must be between 0 and 100');
  }
  return { isValid: errors.length === 0, errors };
};

export const isFlashSaleActive = (sale: FlashSaleInput): boolean => {
  return sale.isActive && sale.status === 'active';
};

export const isFlashSaleLive = (sale: FlashSaleInput): boolean => {
  const now = new Date();
  const start = new Date(sale.schedule.startDate);
  const end = new Date(sale.schedule.endDate);
  return sale.isActive && sale.status === 'active' && now >= start && now <= end;
};
