import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  WEBHOOK_SIGNATURE_KEY,
  type WebhookSignatureOptions,
} from '../decorators/webhook-signature.decorator';

interface WebhookRequest {
  readonly rawBody?: string;
  readonly headers: Readonly<Record<string, string | string[] | undefined>>;
}

@Injectable()
export class WebhookSignatureGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const options = this.reflector.getAllAndOverride<WebhookSignatureOptions>(
      WEBHOOK_SIGNATURE_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!options) return true;

    const request = context.switchToHttp().getRequest<WebhookRequest>();
    const headerName = options.header ?? 'x-webhook-signature';
    const raw = request.headers[headerName];
    const signature = Array.isArray(raw) ? raw[0] : raw;
    if (!signature) {
      throw new UnauthorizedException('Missing webhook signature');
    }
    // Actual verification is done inside the gateway with the config secret
    return true;
  }
}
