import { Injectable } from '@nestjs/common';
import type { PaymentGatewayValue } from '@vubon/shared-types/business/payment';
import { GatewayAbstract } from '../base/gateway.abstract';
import { PaymentGatewayOperationError } from '../base/gateway.errors';
import type {
  CreateGatewayPaymentInput,
  GatewayPaymentResult,
  RefundGatewayPaymentInput,
  RefundGatewayResult,
  WebhookInput,
  WebhookResult,
} from '../base/gateway.types';
import { CryptoClient } from './crypto.client';
import { CryptoConfig } from './crypto.config';
import { CryptoWebhook } from './crypto.webhook';

@Injectable()
export class CryptoGateway extends GatewayAbstract {
  readonly name = 'crypto';
  readonly type: PaymentGatewayValue = 'manual' as PaymentGatewayValue;
  override readonly isLocal = false;

  constructor(
    private readonly client: CryptoClient,
    private readonly config: CryptoConfig,
    private readonly webhook: CryptoWebhook,
  ) {
    super();
  }

  async createPayment(input: CreateGatewayPaymentInput): Promise<GatewayPaymentResult> {
    try {
      const expiresAt = new Date(Date.now() + 30 * 60 * 1000).toISOString();
      const qrData = `${this.config.network}:${this.config.walletAddress}?amount=${input.amount}&currency=${input.currency}`;
      return {
        gatewayReference: this.config.walletAddress,
        status: 'pending',
        rawResponse: {
          walletAddress: this.config.walletAddress,
          network: this.config.network,
          amount: input.amount,
          currency: input.currency,
          paymentId: input.paymentId,
          expiresAt,
          qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrData)}`,
        },
      };
    } catch (error) {
      throw this.mapError(error);
    }
  }

  async refundPayment(_input: RefundGatewayPaymentInput): Promise<RefundGatewayResult> {
    throw new PaymentGatewayOperationError(
      this.name,
      'crypto refunds require manual processing',
    );
  }

  async verifyWebhook(input: WebhookInput): Promise<WebhookResult> {
    if (!this.webhook.verifySignature(input.rawBody, input.signature)) {
      throw new PaymentGatewayOperationError(this.name, 'invalid signature');
    }
    const body = this.webhook.parse(input.rawBody);
    const verified = await this.client.verifyPayment({
      walletAddress: body.walletAddress,
      txHash: body.txHash,
      expectedAmount: Number(body.amount),
      expectedCurrency: body.currency,
    });

    return {
      gatewayReference: body.walletAddress,
      status: verified.verified ? 'confirmed' : 'pending',
      amount: Number(body.amount),
      currency: body.currency,
      gatewayTransactionId: body.txHash,
      rawPayload: body as unknown as Readonly<Record<string, unknown>>,
    };
  }
}
