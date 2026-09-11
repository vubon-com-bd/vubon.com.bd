import { RETURN_SHIPMENT } from '@vubon/shared-constants/src/logistics/return-shipment.constants';

export interface ReturnShipmentInput {
  orderId: string;
  reason: string;
  status: string;
  order: { placedAt: Date };
}

export const validateReturnShipment = (
  shipment: Partial<ReturnShipmentInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!shipment.orderId) errors.push('Order ID is required');
  if (!shipment.reason) errors.push('Return reason is required');
  if (shipment.status && !Object.keys(RETURN_SHIPMENT.STATUS).includes(shipment.status)) {
    errors.push('Invalid return shipment status');
  }
  return { isValid: errors.length === 0, errors };
};

export const isReturnShipmentValid = (shipment: ReturnShipmentInput): boolean => {
  const returnWindow = 30;
  const orderDate = new Date(shipment.order.placedAt);
  const daysSinceOrder = (Date.now() - orderDate.getTime()) / (1000 * 60 * 60 * 24);
  return daysSinceOrder <= returnWindow && shipment.status === 'pending';
};
