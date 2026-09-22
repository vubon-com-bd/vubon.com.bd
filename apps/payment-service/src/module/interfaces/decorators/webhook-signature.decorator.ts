import { SetMetadata } from '@nestjs/common';

export const WEBHOOK_SIGNATURE_KEY = 'webhookSignature';

export interface WebhookSignatureOptions {
  readonly gateway: string;
  readonly header?: string;
}

export const WebhookSignature = (
  options: WebhookSignatureOptions,
): MethodDecorator & ClassDecorator =>
  SetMetadata(WEBHOOK_SIGNATURE_KEY, options);
