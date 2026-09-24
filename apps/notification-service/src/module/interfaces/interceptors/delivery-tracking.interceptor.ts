import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { AnalyticsClient } from '../../infrastructure/services/external/analytics.client';

@Injectable()
export class DeliveryTrackingInterceptor implements NestInterceptor {
  constructor(private readonly analytics: AnalyticsClient) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<{
      method: string;
      url: string;
    }>();
    const start = Date.now();

    return next.handle().pipe(
      tap(() => {
        void this.analytics.track('api.latency', {
          method: request.method,
          url: request.url,
          durationMs: Date.now() - start,
        });
      }),
    );
  }
}
