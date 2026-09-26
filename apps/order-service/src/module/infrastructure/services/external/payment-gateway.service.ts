import { Injectable } from '@nestjs/common';

export interface PaymentResult {
  readonly success: boolean;
  readonly transactionId?: string;
  readonly error?: string;
}

@Injectable()
export class PaymentGatewayService {
  async charge(_orderId: string, _amount: number): Promise<PaymentResult> {
    throw new Error('Payment gateway not yet wired');
  }

  async refund(_transactionId: string, _amount: number): Promise<PaymentResult> {
    throw new Error('Payment refund not yet wired');
  }
}
