import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  IDEMPOTENT_KEY,
  type IdempotentOptions,
} from '../decorators/idempotent.decorator';

interface RequestWithHeaders {
  readonly method: string;
  readonly headers: Readonly<Record<string, string | string[] | undefined>>;
}

@Injectable()
export class IdempotencyGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const options = this.reflector.getAllAndOverride<IdempotentOptions>(
      IDEMPOTENT_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!options) return true;

    const request = context.switchToHttp().getRequest<RequestWithHeaders>();
    if (request.method === 'GET') return true;

    const header = options.headerName ?? 'x-idempotency-key';
    const raw = request.headers[header];
    const value = Array.isArray(raw) ? raw[0] : raw;
    if (!value || value.length < 8 || value.length > 128) {
      throw new BadRequestException(
        `Missing or invalid ${header} header (8-128 chars)`,
      );
    }
    return true;
  }
}
