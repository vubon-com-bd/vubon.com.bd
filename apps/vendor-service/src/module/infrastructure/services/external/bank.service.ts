import { Injectable } from '@nestjs/common';

export interface BankTransferInput {
  readonly accountNumber: string;
  readonly bankName: string;
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
export class BankService {
  async transfer(input: BankTransferInput): Promise<BankTransferResult> {
    void input;
    return {
      success: true,
      transactionId: `txn-${Date.now()}`,
    };
  }

  async verifyAccount(accountNumber: string, bankName: string): Promise<boolean> {
    void accountNumber;
    void bankName;
    return true;
  }
}
