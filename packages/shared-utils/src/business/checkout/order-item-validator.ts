import { ORDER_ITEM } from '@vubon/shared-constants/src/business/checkout/order-item.constants';

export interface OrderItemInput {
  productId: string;
  name: string;
  sku: string;
  quantity: number;
  status: string;
}

export const validateOrderItem = (
  item: Partial<OrderItemInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!item.productId) errors.push('Product ID is required');
  if (!item.name) errors.push('Product name is required');
  if (!item.sku) errors.push('SKU is required');
  if (item.quantity !== undefined && item.quantity < 1) {
    errors.push('Quantity must be at least 1');
  }
  if (item.status && !Object.keys(ORDER_ITEM.STATUS).includes(item.status)) {
    errors.push('Invalid order item status');
  }
  return { isValid: errors.length === 0, errors };
};
