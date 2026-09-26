import {
  Injectable,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { BaseGuard } from '@vubon/shared-kernel/interfaces';
import { WebhookVerifierService } from '../../infrastructure/services/internal/webhook-verifier.service';

@Injectable()
export class WebhookSignatureGuard extends BaseGuard {
  constructor(private readonly webhookVerifier: WebhookVerifierService) {
    super();
  }

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<{
      headers: Record<string, string | string[] | undefined>;
      rawBody?: string | Buffer;
      body?: unknown;
    }>();

    const signature = request.headers['x-webhook-signature'];
    if (!signature || Array.isArray(signature)) {
      throw new ForbiddenException('Missing webhook signature');
    }

    const rawBody = request.rawBody
      ? request.rawBody.toString()
      : JSON.stringify(request.body ?? {});

    const secret = process.env.WEBHOOK_SECRET ?? 'dev-webhook-secret';

    const valid = this.webhookVerifier.verify(rawBody, signature, secret);
    if (!valid) {
      throw new ForbiddenException('Invalid webhook signature');
    }
    return true;
  }
}
