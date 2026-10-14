import { Injectable } from '@nestjs/common';
import { BankProvider, type BankTransferInput, type BankTransferResult } from './base.provider.js';

@Injectable()
export class BankTransferProvider extends BankProvider {
  constructor() {
    super('bank_transfer');
  }

  isEnabled(): boolean {
    return true; // Direct bank transfer always available as fallback
  }

  async transfer(input: BankTransferInput): Promise<BankTransferResult> {
    const txn = `bt_${input.reference}_${Date.now()}`;
    this.logger.log(`Bank transfer ${input.amount} ${input.currency} → ${input.accountNumber}`);
    return { success: true, transactionId: txn, processedAt: new Date().toISOString() };
  }
}
