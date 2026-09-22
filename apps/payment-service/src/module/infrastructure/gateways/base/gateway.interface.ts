import type { PaymentGatewayValue } from '@vubon/shared-types/business/payment';
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

export interface PaymentGateway {
  readonly name: string;
  readonly type: PaymentGatewayValue;
  readonly isLocal: boolean;

  createPayment(input: CreateGatewayPaymentInput): Promise<GatewayPaymentResult>;

  capturePayment(input: CaptureGatewayPaymentInput): Promise<CaptureGatewayResult>;

  refundPayment(input: RefundGatewayPaymentInput): Promise<RefundGatewayResult>;

  verifyWebhook(input: WebhookInput): Promise<WebhookResult>;
}
