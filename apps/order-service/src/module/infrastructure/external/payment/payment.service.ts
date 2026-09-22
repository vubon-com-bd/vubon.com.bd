import { Injectable } from '@nestjs/common';

export interface PaymentChargeResult {
  readonly success: boolean;
  readonly transactionId?: string;
  readonly error?: string;
}

@Injectable()
export class PaymentService {
  async charge(
    _orderId: string,
    _amount: number,
    _currency: string = 'BDT',
  ): Promise<PaymentChargeResult> {
    throw new Error('Payment SDK not yet wired');
  }

  async refund(
    _transactionId: string,
    _amount: number,
  ): Promise<PaymentChargeResult> {
    throw new Error('Payment refund not yet wired');
  }

  async verify(_transactionId: string): Promise<PaymentChargeResult> {
    throw new Error('Payment verification not yet wired');
  }
}
