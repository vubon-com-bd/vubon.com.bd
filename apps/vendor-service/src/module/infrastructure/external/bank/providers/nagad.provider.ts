import { Injectable } from '@nestjs/common';
import type { BankTransferInput, BankTransferResult } from './bkash.provider';

@Injectable()
export class NagadProvider {
  async transfer(input: BankTransferInput): Promise<BankTransferResult> {
    void input;
    return {
      success: true,
      transactionId: `nagad-${Date.now()}`,
    };
  }
}
