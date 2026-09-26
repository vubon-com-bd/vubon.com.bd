import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

interface AnalyticsRequest {
  readonly url: string;
  readonly method: string;
  readonly user?: { readonly userId?: string };
}

@Injectable()
export class AnalyticsInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<unknown> {
    const request = context.switchToHttp().getRequest<AnalyticsRequest>();

    return next.handle().pipe(
      tap(() => {
        void request;
      }),
    );
  }
}
