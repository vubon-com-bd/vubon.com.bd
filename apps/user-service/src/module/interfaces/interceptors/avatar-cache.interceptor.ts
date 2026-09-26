import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class AvatarCacheInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<unknown> {
    const response = context
      .switchToHttp()
      .getResponse<{ setHeader: (k: string, v: string) => void }>();

    return next.handle().pipe(
      tap(() => {
        response.setHeader('Cache-Control', 'public, max-age=3600');
      }),
    );
  }
}
