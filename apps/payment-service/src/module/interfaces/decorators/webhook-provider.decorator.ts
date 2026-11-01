/**
 * @WebhookProvider() — extracts provider name from route URL
 * @module payment-service/interfaces/decorators
 */
import { createParamDecorator } from '@nestjs/common';
import type { ExecutionContext } from '@nestjs/common';

/**
 * Pure helper — extracts provider from URL string.
 * Exported so it can be unit-tested directly.
 */
export function extractProviderFromUrl(url: string | undefined): string {
  const match = (url ?? '').match(/\/webhooks\/([a-z0-9-]+)/i);
  return match?.[1]?.toLowerCase() ?? 'unknown';
}

export const WebhookProvider = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): string => {
    const req = ctx.switchToHttp().getRequest<{ url?: string }>();
    return extractProviderFromUrl(req.url);
  },
);
