export class OrderReturnPolicyService {
  static canReturn(status: string, deliveredAt: Date | null): boolean {
    if (status !== 'delivered') return false;
    if (!deliveredAt) return false;
    const windowMs = 7 * 24 * 60 * 60 * 1000;
    return Date.now() - deliveredAt.getTime() <= windowMs;
  }
}
