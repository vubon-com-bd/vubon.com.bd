/**
 * WebhookSignatureGuard — validates X-Signature headers for webhooks
 * @module payment-service/interfaces/guards
 *
 * ⚠️ Payment gateways use different signature schemes; each controller
 * verifies its own signature in the handler via gateway adapter.
 * This guard checks only that a signature header is present (basic gate).
 */
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { BaseGuard } from '@vubon/shared-kernel/interfaces/guards';
import { HTTP_STATUS } from '@vubon/shared-constants/common';

const SIGNATURE_HEADERS = [
  'x-signature',
  'x-bkash-signature',
  'stripe-signature',
  'paypal-transmission-sig',
  'x-sslcommerz-signature',
];

@Injectable()
export class WebhookSignatureGuard extends BaseGuard {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<{
      headers: Record<string, string | string[] | undefined>;
    }>();

    const hasSignature = SIGNATURE_HEADERS.some((name) => {
      const value = req.headers[name];
      return (typeof value === 'string' && value.length > 0) ||
        (Array.isArray(value) && value.length > 0);
    });

    if (!hasSignature) {
      throw new UnauthorizedException({
        statusCode: HTTP_STATUS.UNAUTHORIZED,
        message: 'Missing webhook signature header',
      });
    }

    return true;
  }
}
