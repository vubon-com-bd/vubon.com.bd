import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { BaseGuard } from '@vubon/shared-kernel/interfaces';
import { getOptionalEnv } from '@vubon/shared-config/common';
import { createHmac, timingSafeEqual } from 'node:crypto';

interface WebhookRequest {
  readonly headers: Readonly<Record<string, string | undefined>>;
  readonly body: unknown;
}

@Injectable()
export class WebhookSignatureGuard extends BaseGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<WebhookRequest>();
    const signature = request.headers['x-webhook-signature'];
    const secret = getOptionalEnv('WEBHOOK_SECRET', '');

    if (!signature || !secret) {
      throw new UnauthorizedException('Webhook signature missing');
    }

    const payload = JSON.stringify(request.body);
    const expected = createHmac('sha256', secret).update(payload).digest('hex');

    const a = Buffer.from(signature, 'utf8');
    const b = Buffer.from(expected, 'utf8');

    if (a.length !== b.length || !timingSafeEqual(a, b)) {
      throw new UnauthorizedException('Invalid webhook signature');
    }

    return true;
  }
}
