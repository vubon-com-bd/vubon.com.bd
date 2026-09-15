import {
  Injectable,
  type CallHandler,
  type ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { type Observable, from, switchMap } from 'rxjs';
import type { AuthContext } from '@vubon/shared-types/auth';
import type { TokenServiceContract } from '../../server/token/token.service.interface';

interface RequestWithUser {
  user?: AuthContext;
  headers?: Record<string, string | undefined>;
}

/**
 * Refreshes the access token transparently when the header carries
 * an `x-refresh-token`. Apps can opt in per-route.
 */
@Injectable()
export class TokenRefreshInterceptor {
  constructor(private readonly tokens: TokenServiceContract) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const req = context.switchToHttp().getRequest<RequestWithUser>();
    const refreshToken = req.headers?.['x-refresh-token'];
    if (!refreshToken) return next.handle();

    return from(
      (async () => {
        try {
          const payload = this.tokens.verifyRefresh(refreshToken);
          const pair = this.tokens.issuePair({
            userId: String(payload.sub),
            sessionId: String(payload.sid ?? ''),
          });
          req.headers = {
            ...(req.headers ?? {}),
            authorization: `Bearer ${pair.accessToken}`,
            'x-new-access-token': pair.accessToken,
          };
          return pair;
        } catch {
          throw new UnauthorizedException('Invalid refresh token');
        }
      })()
    ).pipe(switchMap(() => next.handle()));
  }
}
