/**
 * Calculate refund amount (with restock fee)
 * @module shared-utils/calculator/commerce
 */
export interface RefundInput {
  readonly paidAmount: number;
  readonly refundPercent?: number;
  readonly restockFee?: number;
  readonly shippingRefund?: number;
}

export function calculateRefund(input: RefundInput): number {
  const { paidAmount, refundPercent = 100, restockFee = 0, shippingRefund = 0 } = input;
  if (!Number.isFinite(paidAmount) || paidAmount <= 0) return 0;
  if (!Number.isFinite(refundPercent) || refundPercent <= 0 || refundPercent > 100) return 0;

  const base = (paidAmount * refundPercent) / 100;
  const total = base + shippingRefund - restockFee;
  return round2(Math.max(0, Math.min(total, paidAmount + shippingRefund)));
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}
