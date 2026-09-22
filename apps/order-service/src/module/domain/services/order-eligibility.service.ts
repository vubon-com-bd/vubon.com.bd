export class OrderEligibilityService {
  static canPlaceOrder(
    customerId: string | null,
    itemsCount: number,
  ): boolean {
    if (!customerId) return false;
    if (itemsCount < 1) return false;
    return true;
  }
}
