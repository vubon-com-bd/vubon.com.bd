import { Injectable } from '@nestjs/common';
import type { BankTransferInput, BankTransferResult } from './bkash.provider';

@Injectable()
export class RocketProvider {
  async transfer(input: BankTransferInput): Promise<BankTransferResult> {
    void input;
    return {
      success: true,
      transactionId: `rocket-${Date.now()}`,
    };
  }
}
