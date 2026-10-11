/**
 * IProviderWebhookService — inbound webhook handling (SendGrid/Twilio/SES/etc.)
 * @module notification-service/application/services/interfaces
 */
import type {
  ProviderWebhookRequestDTO,
  ProviderWebhookProcessResultDTO,
} from '../../dtos/requests/provider-webhook/index.js';

export const PROVIDER_WEBHOOK_SERVICE = Symbol('PROVIDER_WEBHOOK_SERVICE');

export interface IProviderWebhookService {
  process(dto: ProviderWebhookRequestDTO): Promise<ProviderWebhookProcessResultDTO>;
  verifySignature(
    provider: string,
    rawBody: string,
    signature: string,
    secret?: string,
  ): boolean;
}
