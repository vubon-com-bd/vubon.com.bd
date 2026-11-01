/**
 * BankVerificationService — internal helper to verify bank account numbers
 * @module vendor-service/infrastructure/services/internal
 */
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class BankVerificationService {
  private readonly logger = new Logger(BankVerificationService.name);

  /**
   * Placeholder verification: real impl would call a bank API or use penny-drop.
   */
  async verify(input: {
    readonly accountNumber: string;
    readonly bankName: string;
    readonly accountHolderName: string;
  }): Promise<{ readonly verified: boolean; readonly reason?: string }> {
    const account = input.accountNumber.replace(/\s/g, '');
    if (account.length < 6) {
      return { verified: false, reason: 'account number too short' };
    }
    this.logger.debug(`Bank verify placeholder for ${input.bankName}`);
    return { verified: true };
  }
}
