import { Injectable, type CallHandler, type ExecutionContext } from '@nestjs/common';
import { type Observable, tap } from 'rxjs';
import { BaseInterceptor } from './base.interceptor';

interface RequestWithMeta {
  method?: string;
  url?: string;
  user?: { userId?: string };
}

@Injectable()
export class LoggingInterceptor extends BaseInterceptor<unknown> {
  override intercept(context: ExecutionContext, next: CallHandler<unknown>): Observable<unknown> {
    const req = context.switchToHttp().getRequest<RequestWithMeta>();
    const started = Date.now();
    // eslint-disable-next-line no-console
    console.debug('[nestjs:req]', {
      method: req.method,
      url: req.url,
      userId: req.user?.userId,
    });
    return next.handle().pipe(
      tap({
        next: () => {
          // eslint-disable-next-line no-console
          console.debug('[nestjs:res]', {
            url: req.url,
            ms: Date.now() - started,
          });
        },
        error: (err: unknown) => {
          // eslint-disable-next-line no-console
          console.debug('[nestjs:err]', {
            url: req.url,
            ms: Date.now() - started,
            message: err instanceof Error ? err.message : 'unknown',
          });
        },
      })
    );
  }
}
