/**
 * WebhookSignatureGuard — HMAC verify for provider webhooks
 * @module logistics-service/interfaces/guards
 *
 * ⚠️ Best-effort: if provider secret not configured → skip verification
 * ⚠️ Uses SignatureService (HMAC-SHA256)
 */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request } from 'express';
import { SignatureService } from '@infrastructure/services/internal/signature.service.js';

type SignatureAlgorithm = 'sha256' | 'sha512';

interface WebhookSecretConfig {
  readonly envKey: string;
  readonly headerName: string;
  readonly algorithm: SignatureAlgorithm;
}

// Provider → env key + header name mapping
const PROVIDER_CONFIGS: Record<string, WebhookSecretConfig> = {
  'sa-paribahan': { envKey: 'SA_PARIBAHAN_WEBHOOK_SECRET', headerName: 'x-sa-paribahan-signature', algorithm: 'sha256' },
  'sundarban': { envKey: 'SUNDARBAN_WEBHOOK_SECRET', headerName: 'x-sundarban-signature', algorithm: 'sha256' },
  'redx': { envKey: 'REDX_WEBHOOK_SECRET', headerName: 'x-redx-signature', algorithm: 'sha256' },
  'pathao': { envKey: 'PATHAO_WEBHOOK_SECRET', headerName: 'x-pathao-signature', algorithm: 'sha256' },
  'paperfly': { envKey: 'PAPERFLY_WEBHOOK_SECRET', headerName: 'x-paperfly-signature', algorithm: 'sha256' },
  'steadfast': { envKey: 'STEADFAST_WEBHOOK_SECRET', headerName: 'x-steadfast-signature', algorithm: 'sha256' },
  'dhl': { envKey: 'DHL_WEBHOOK_SECRET', headerName: 'x-dhl-signature', algorithm: 'sha256' },
  'fedex': { envKey: 'FEDEX_WEBHOOK_SECRET', headerName: 'x-fedex-signature', algorithm: 'sha256' },
  'ups': { envKey: 'UPS_WEBHOOK_SECRET', headerName: 'x-ups-signature', algorithm: 'sha256' },
  'aramex': { envKey: 'ARAMEX_WEBHOOK_SECRET', headerName: 'x-aramex-signature', algorithm: 'sha256' },
};

@Injectable()
export class WebhookSignatureGuard implements CanActivate {
  private readonly logger = new Logger(WebhookSignatureGuard.name);

  constructor(private readonly signatureService: SignatureService) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request & { provider?: string }>();

    // Provider identified via route param (e.g., /webhooks/:provider or path)
    const provider = this.extractProvider(req);
    if (!provider) {
      this.logger.warn('Webhook: provider not identified — allowing (fail-open)');
      return true;
    }

    const config = PROVIDER_CONFIGS[provider];
    if (!config) {
      this.logger.warn(`Webhook: unknown provider "${provider}" — allowing (fail-open)`);
      return true;
    }

    const secret = process.env[config.envKey];
    if (!secret) {
      this.logger.warn(`Webhook: ${config.envKey} not set — skipping verification (dev mode)`);
      return true;
    }

    const signature = req.headers[config.headerName] as string | undefined;
    if (!signature) {
      this.logger.warn(`Webhook: ${provider} — missing signature header`);
      throw new UnauthorizedException('Missing webhook signature');
    }

    const payload = JSON.stringify(req.body ?? {});
    const valid = this.signatureService.verify(payload, signature, secret, config.algorithm);

    if (!valid) {
      this.logger.warn(`Webhook: ${provider} — invalid signature`);
      throw new UnauthorizedException('Invalid webhook signature');
    }

    req.provider = provider;
    return true;
  }

  private extractProvider(req: Request): string | undefined {
    // Try route params: /webhooks/:provider
    const params = (req as unknown as { params?: Record<string, string> }).params;
    if (params?.['provider']) return params['provider'];

    // Try URL path segment after /webhooks/
    const path = req.path ?? req.url ?? '';
    const match = path.match(/\/webhooks\/([a-z-]+)/);
    return match?.[1];
  }
}
