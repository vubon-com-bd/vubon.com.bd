/**
 * BaseGatewayAdapter — shared helpers for concrete gateways
 * @module payment-service/infrastructure/gateways
 */
import { Logger } from '@nestjs/common';
import type {
  IPaymentGatewayAdapter,
  GatewayInitiateInput,
  GatewayInitiateResult,
  GatewayVerifyInput,
  GatewayVerifyResult,
  GatewayCaptureInput,
  GatewayCaptureResult,
  GatewayRefundInput,
  GatewayRefundResult,
  GatewayCancelResult,
} from './payment-gateway.adapter.js';
import type { PaymentEntity } from '../../domain/entities/payment.entity.js';

export abstract class BaseGatewayAdapter implements IPaymentGatewayAdapter {
  protected readonly logger: Logger;

  constructor(public readonly gatewayId: string) {
    this.logger = new Logger(`${gatewayId}GatewayAdapter`);
  }

  abstract isEnabled(): boolean;
  abstract initiate(input: GatewayInitiateInput): Promise<GatewayInitiateResult>;
  abstract verify(input: GatewayVerifyInput): Promise<GatewayVerifyResult>;
  abstract capture(input: GatewayCaptureInput): Promise<GatewayCaptureResult>;
  abstract refund(input: GatewayRefundInput): Promise<GatewayRefundResult>;
  abstract cancel(payment: PaymentEntity): Promise<GatewayCancelResult>;

  protected notImplemented(verb: string): {
    success: false;
    error: string;
    errorCode: string;
  } {
    return {
      success: false,
      error: `${verb} not supported by ${this.gatewayId}`,
      errorCode: 'NOT_SUPPORTED',
    };
  }
}
