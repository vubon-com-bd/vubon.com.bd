import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

interface TrackingRequest {
  readonly url: string;
  readonly method: string;
  readonly user?: { readonly userId?: string };
  readonly headers: Readonly<Record<string, string | undefined>>;
}

@Injectable()
export class TrackingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<unknown> {
    const request = context.switchToHttp().getRequest<TrackingRequest>();
    const startedAt = Date.now();

    return next.handle().pipe(
      tap(() => {
        const duration = Date.now() - startedAt;
        void request;
        void duration;
      }),
    );
  }
}
