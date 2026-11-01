import { Injectable } from '@nestjs/common';
import { BankProvider, type BankTransferInput, type BankTransferResult } from './base.provider.js';

@Injectable()
export class NagadProvider extends BankProvider {
  constructor() {
    super('nagad');
  }

  isEnabled(): boolean {
    return process.env['NAGAD_ENABLED'] === 'true';
  }

  async transfer(input: BankTransferInput): Promise<BankTransferResult> {
    if (!this.isEnabled()) {
      return { success: false, error: 'nagad disabled', errorCode: 'DISABLED' };
    }
    const txn = `nagad_${input.reference}_${Date.now()}`;
    this.logger.log(`Transfer ${input.amount} ${input.currency} → ${txn}`);
    return { success: true, transactionId: txn, processedAt: new Date().toISOString() };
  }
}
