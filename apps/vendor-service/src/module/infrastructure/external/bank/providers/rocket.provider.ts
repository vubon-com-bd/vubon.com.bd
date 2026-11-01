import { Injectable } from '@nestjs/common';
import { BankProvider, type BankTransferInput, type BankTransferResult } from './base.provider.js';

@Injectable()
export class RocketProvider extends BankProvider {
  constructor() {
    super('rocket');
  }

  isEnabled(): boolean {
    return process.env['ROCKET_ENABLED'] === 'true';
  }

  async transfer(input: BankTransferInput): Promise<BankTransferResult> {
    if (!this.isEnabled()) {
      return { success: false, error: 'rocket disabled', errorCode: 'DISABLED' };
    }
    const txn = `rocket_${input.reference}_${Date.now()}`;
    this.logger.log(`Transfer ${input.amount} ${input.currency} → ${txn}`);
    return { success: true, transactionId: txn, processedAt: new Date().toISOString() };
  }
}
