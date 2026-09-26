/**
 * TokenRefreshInterceptor — slides session TTL on successful requests
 * @module auth-service/interfaces/interceptors
 *
 * Adds a `X-Session-Slid` header when a session has been refreshed.
 * The actual sliding happens in AuthSessionService — this interceptor
 * only signals intent via headers when configured.
 */
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import type { AuthenticatedUser } from '../decorators/current-user.decorator';

const SLIDE_THRESHOLD_SECONDS = 300;

interface HttpRequest {
  user?: AuthenticatedUser & { sessionExpiresAt?: number };
}

interface HttpResponse {
  setHeader(name: string, value: string): void;
}

@Injectable()
export class TokenRefreshInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<unknown> {
    const http = context.switchToHttp();
    const request = http.getRequest<HttpRequest>();
    const response = http.getResponse<HttpResponse>();

    return next.handle().pipe(
      tap(() => {
        const user = request.user;
        if (!user?.sessionId || !user.sessionExpiresAt) return;
        const remainingSec = Math.floor((user.sessionExpiresAt - Date.now()) / 1000);
        if (remainingSec < SLIDE_THRESHOLD_SECONDS) {
          response.setHeader('X-Session-Slid', 'true');
        }
      }),
    );
  }
}
