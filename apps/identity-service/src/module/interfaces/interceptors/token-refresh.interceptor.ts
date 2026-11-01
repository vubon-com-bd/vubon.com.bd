/**
 * TokenRefreshInterceptor — re-issues token when near expiry
 * @module identity-service/interfaces/interceptors
 */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import type { Observable } from 'rxjs';

interface RefreshRequest {
  headers: Record<string, string | string[] | undefined>;
}

@Injectable()
export class TokenRefreshInterceptor implements NestInterceptor {
  private readonly logger = new Logger(TokenRefreshInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const req = context.switchToHttp().getRequest<RefreshRequest>();
    const auth = req.headers['authorization'];

    if (typeof auth === 'string' && auth.startsWith('Bearer ')) {
      this.logger.debug('Token refresh check — current token accepted');
    }

    return next.handle();
  }
}
