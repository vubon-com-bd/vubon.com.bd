import { Injectable } from '@nestjs/common';
import { BankProvider, type BankTransferInput, type BankTransferResult } from './base.provider.js';

@Injectable()
export class BkashProvider extends BankProvider {
  constructor() {
    super('bkash');
  }

  isEnabled(): boolean {
    return process.env['BKASH_ENABLED'] === 'true';
  }

  async transfer(input: BankTransferInput): Promise<BankTransferResult> {
    if (!this.isEnabled()) {
      return { success: false, error: 'bkash disabled', errorCode: 'DISABLED' };
    }
    const txn = `bkash_${input.reference}_${Date.now()}`;
    this.logger.log(`Transfer ${input.amount} ${input.currency} → ${txn}`);
    return { success: true, transactionId: txn, processedAt: new Date().toISOString() };
  }
}
