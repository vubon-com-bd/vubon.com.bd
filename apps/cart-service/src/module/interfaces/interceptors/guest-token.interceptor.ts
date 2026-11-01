/**
 * GuestTokenInterceptor — propagates guest token from header/body
 * @module cart-service/interfaces/interceptors
 *
 * Extracts X-Guest-Token header or body.guestToken and attaches to req.guestToken.
 */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { type Observable } from 'rxjs';

@Injectable()
export class GuestTokenInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const req = context.switchToHttp().getRequest<{
      headers: Record<string, string | string[] | undefined>;
      body?: { guestToken?: string };
      guestToken?: string;
    }>();

    // Priority: header > body
    const headerToken = this.pick(req.headers['x-guest-token']);
    const bodyToken = req.body?.guestToken;

    const token = headerToken ?? bodyToken;
    if (token) req.guestToken = token;

    return next.handle();
  }

  private pick(raw: string | string[] | undefined): string | undefined {
    if (Array.isArray(raw)) return raw[0];
    return raw;
  }
}
