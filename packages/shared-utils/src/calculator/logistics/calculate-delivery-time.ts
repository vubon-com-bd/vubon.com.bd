/**
 * Estimate delivery date from business days offset (skips weekends)
 * @module shared-utils/calculator/logistics
 */
export interface DeliveryTimeInput {
  readonly from: Date;
  readonly businessDays: number;
  readonly weekendDays?: readonly number[];
}

export function calculateDeliveryTime(input: DeliveryTimeInput): Date {
  const { from, businessDays, weekendDays = [6, 0] } = input;
  if (!Number.isInteger(businessDays) || businessDays < 0) {
    throw new RangeError('businessDays must be a non-negative integer');
  }
  const result = new Date(from.getTime());
  let remaining = businessDays;
  while (remaining > 0) {
    result.setDate(result.getDate() + 1);
    if (!weekendDays.includes(result.getDay())) remaining -= 1;
  }
  return result;
}
