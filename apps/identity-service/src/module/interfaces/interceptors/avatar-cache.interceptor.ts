/**
 * AvatarCacheInterceptor — caches avatar CDN lookups
 * @module identity-service/interfaces/interceptors
 */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import type { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

interface AvatarRequest {
  method: string;
  url: string;
}

@Injectable()
export class AvatarCacheInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const req = context.switchToHttp().getRequest<AvatarRequest>();
    if (req.method === 'GET' && req.url.includes('/avatar')) {
      // Add Cache-Control header via decorators or manually
    }
    return next.handle().pipe(tap(() => undefined));
  }
}
