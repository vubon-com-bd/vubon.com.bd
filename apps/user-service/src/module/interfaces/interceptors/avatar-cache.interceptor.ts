/**
 * AvatarCacheInterceptor — sets long Cache-Control on avatar responses
 * @module user-service/interfaces/interceptors
 */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import type { Response } from 'express';

@Injectable()
export class AvatarCacheInterceptor implements NestInterceptor {
  private static readonly MAX_AGE_SECONDS = 86400; // 1 day

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const response = context.switchToHttp().getResponse<Response>();

    return next.handle().pipe(
      tap(() => {
        response.setHeader(
          'Cache-Control',
          `public, max-age=${AvatarCacheInterceptor.MAX_AGE_SECONDS}, immutable`
        );
      })
    );
  }
}
