import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

interface GuestRequest {
  readonly headers: Record<string, string | string[] | undefined>;
}

@Injectable()
export class GuestTokenInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<unknown> {
    const request = context.switchToHttp().getRequest<GuestRequest>();

    return next.handle().pipe(
      tap(() => {
        const token = request.headers['x-guest-token'];
        if (token) {
          const response = context
            .switchToHttp()
            .getResponse<{ setHeader: (k: string, v: string) => void }>();
          const value = Array.isArray(token) ? token[0] : token;
          response.setHeader('X-Guest-Token', value);
        }
      }),
    );
  }
}
