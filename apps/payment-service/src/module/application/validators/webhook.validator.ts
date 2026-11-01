/**
 * WebhookValidator — provider payload validation
 * @module payment-service/application/validators
 */
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';

export type WebhookProvider = 'bkash' | 'nagad' | 'stripe' | 'sslcommerz';

const SUPPORTED: readonly WebhookProvider[] = ['bkash', 'nagad', 'stripe', 'sslcommerz'];

export class WebhookValidator {
  static validateProvider(provider: string): WebhookProvider {
    if (!SUPPORTED.includes(provider as WebhookProvider)) {
      throw new ApplicationValidationError(
        `Unsupported webhook provider "${provider}". Supported: ${SUPPORTED.join(', ')}`,
        'provider',
      );
    }
    return provider as WebhookProvider;
  }

  static validateBkash(payload: unknown): { trxID: string; amount: string; status: string } {
    return this.requireFields(payload, 'bkash', ['trxID', 'amount', 'transactionStatus']);
  }

  static validateNagad(payload: unknown): { orderId: string; amount: string; status: string } {
    return this.requireFields(payload, 'nagad', ['orderId', 'amount', 'status']);
  }

  static validateStripe(payload: unknown): { id: string; type: string } {
    return this.requireFields(payload, 'stripe', ['id', 'type']);
  }

  static validateSslcommerz(payload: unknown): { tran_id: string; amount: string; status: string } {
    return this.requireFields(payload, 'sslcommerz', ['tran_id', 'amount', 'status']);
  }

  private static requireFields<T = Record<string, unknown>>(
    payload: unknown,
    provider: string,
    fields: readonly string[],
  ): T {
    if (!payload || typeof payload !== 'object') {
      throw new ApplicationValidationError(
        `[${provider}] payload must be an object`,
        'payload',
      );
    }
    const obj = payload as Record<string, unknown>;
    for (const f of fields) {
      if (!(f in obj) || obj[f] === undefined || obj[f] === null) {
        throw new ApplicationValidationError(
          `[${provider}] missing required field "${f}"`,
          f,
        );
      }
    }
    return obj as T;
  }
}
