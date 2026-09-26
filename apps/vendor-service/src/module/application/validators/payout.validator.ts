export class PayoutValidator {
  static validateRequest(input: unknown): void {
    const data = input as Record<string, unknown>;
    if (typeof data.amount !== 'number' || data.amount <= 0) {
      throw new Error('amount must be a positive number');
    }
    if (!data.bankAccountId || typeof data.bankAccountId !== 'string') {
      throw new Error('bankAccountId is required');
    }
  }
}
