/**
 * WebhookSignatureGuard — verifies inbound provider webhook signature
 * @module notification-service/interfaces/guards
 *
 * Uses WebhookVerifierInfraService to validate signature from provider.
 * Provider name read from `:provider` route param or header.
 */
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { BaseGuard } from '@vubon/shared-kernel/interfaces/guards';
import { HTTP_STATUS } from '@vubon/shared-constants/common';
import { WebhookVerifierInfraService } from '@infrastructure/services/internal/webhook-verifier.service.js';
import { getOptionalEnv } from '@vubon/shared-config/common';

const PROVIDER_SECRETS: Readonly<Record<string, string>> = {
  sendgrid: getOptionalEnv('SENDGRID_WEBHOOK_SECRET', ''),
  twilio: getOptionalEnv('TWILIO_AUTH_TOKEN', ''),
  fcm: getOptionalEnv('FCM_WEBHOOK_SECRET', ''),
  apns: getOptionalEnv('APNS_WEBHOOK_SECRET', ''),
};

@Injectable()
export class WebhookSignatureGuard extends BaseGuard {
  constructor(private readonly verifier: WebhookVerifierInfraService) {
    super();
  }

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<{
      params?: Record<string, string>;
      headers: Record<string, string | string[] | undefined>;
      body?: unknown;
      url?: string;
    }>();

    const provider = req.params?.['provider'];
    if (!provider) {
      throw new UnauthorizedException({
        statusCode: HTTP_STATUS.UNAUTHORIZED,
        message: 'Provider not specified',
      });
    }

    const secret = PROVIDER_SECRETS[provider];
    if (!secret) {
      throw new UnauthorizedException({
        statusCode: HTTP_STATUS.UNAUTHORIZED,
        message: `No secret configured for provider "${provider}"`,
      });
    }

    const signature =
      (req.headers['x-webhook-signature'] as string | undefined) ??
      (req.headers['x-twilio-signature'] as string | undefined) ??
      '';

    if (!signature) {
      throw new UnauthorizedException({
        statusCode: HTTP_STATUS.UNAUTHORIZED,
        message: 'Webhook signature header missing',
      });
    }

    const payload = JSON.stringify(req.body ?? {});
    const timestamp = req.headers['x-webhook-timestamp'] as string | undefined;

    const valid = this.verifier.verify({
      provider: provider as 'sendgrid' | 'twilio' | 'fcm' | 'apns',
      payload,
      signature,
      secret,
      timestamp,
      url: req.url,
    });

    if (!valid) {
      throw new UnauthorizedException({
        statusCode: HTTP_STATUS.UNAUTHORIZED,
        message: 'Invalid webhook signature',
      });
    }

    return true;
  }
}
