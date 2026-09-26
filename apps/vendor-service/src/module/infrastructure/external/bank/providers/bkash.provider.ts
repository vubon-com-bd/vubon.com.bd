import { Injectable } from '@nestjs/common';

export interface BankTransferInput {
  readonly accountNumber: string;
  readonly amount: number;
  readonly currency: string;
  readonly reference: string;
}

export interface BankTransferResult {
  readonly success: boolean;
  readonly transactionId?: string;
  readonly error?: string;
}

@Injectable()
export class BkashProvider {
  async transfer(input: BankTransferInput): Promise<BankTransferResult> {
    void input;
    return {
      success: true,
      transactionId: `bkash-${Date.now()}`,
    };
  }
}
