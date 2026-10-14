/**
 * Bank Provider — abstract adapter for payout disbursement
 * @module vendor-service/infrastructure/external/bank/providers
 */
import { Logger } from '@nestjs/common';

export interface BankTransferInput {
  readonly amount: number;
  readonly currency: string;
  readonly accountNumber: string;
  readonly accountHolderName: string;
  readonly bankName: string;
  readonly routingNumber?: string;
  readonly reference: string;
}

export interface BankTransferResult {
  readonly success: boolean;
  readonly transactionId?: string;
  readonly processedAt?: string;
  readonly error?: string;
  readonly errorCode?: string;
}

export abstract class BankProvider {
  protected readonly logger: Logger;

  constructor(public readonly providerId: string) {
    this.logger = new Logger(`${providerId}BankProvider`);
  }

  abstract isEnabled(): boolean;
  abstract transfer(input: BankTransferInput): Promise<BankTransferResult>;

  protected notImplemented(): BankTransferResult {
    return {
      success: false,
      error: `${this.providerId} not implemented`,
      errorCode: 'NOT_IMPLEMENTED',
    };
  }
}
