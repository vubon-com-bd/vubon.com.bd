export class AffiliateCommissionService {
  calculate(orderAmount: number, commissionRate: number): number {
    if (commissionRate < 0 || commissionRate > 100) {
      throw new Error('Commission rate must be 0-100');
    }
    return (orderAmount * commissionRate) / 100;
  }
}
