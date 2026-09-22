import type { PaymentGatewayValue } from '@vubon/shared-types/business/payment';
import type { PaymentGateway } from './gateway.interface';
import type {
  CreateGatewayPaymentInput,
  GatewayPaymentResult,
  CaptureGatewayPaymentInput,
  CaptureGatewayResult,
  RefundGatewayPaymentInput,
  RefundGatewayResult,
  WebhookInput,
  WebhookResult,
} from './gateway.types';
import { PaymentGatewayOperationError } from './gateway.errors';

export abstract class GatewayAbstract implements PaymentGateway {
  abstract readonly name: string;
  abstract readonly type: PaymentGatewayValue;
  readonly isLocal: boolean = false;

  abstract createPayment(
    input: CreateGatewayPaymentInput,
  ): Promise<GatewayPaymentResult>;

  async capturePayment(
    _input: CaptureGatewayPaymentInput,
  ): Promise<CaptureGatewayResult> {
    throw new PaymentGatewayOperationError(
      this.name,
      'capture not supported',
    );
  }

  async refundPayment(
    _input: RefundGatewayPaymentInput,
  ): Promise<RefundGatewayResult> {
    throw new PaymentGatewayOperationError(
      this.name,
      'refund not supported',
    );
  }

  abstract verifyWebhook(input: WebhookInput): Promise<WebhookResult>;

  protected mapError(error: unknown): Error {
    if (error instanceof Error) {
      return new PaymentGatewayOperationError(this.name, error.message);
    }
    return new PaymentGatewayOperationError(this.name, 'unknown error');
  }
}
