import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest();
    const { method, url, headers } = request as {
      method: string;
      url: string;
      headers: Record<string, string | undefined>;
    };
    const requestId = headers['x-request-id'] || 'unknown';
    const start = Date.now();

    this.logger.log(`[${requestId}] ${method} ${url} - Started`);

    return next.handle().pipe(
      tap({
        next: () => {
          const duration = Date.now() - start;
          this.logger.log(`[${requestId}] ${method} ${url} - Completed in ${duration}ms`);
        },
        error: (error: Error) => {
          const duration = Date.now() - start;
          this.logger.error(
            `[${requestId}] ${method} ${url} - Failed in ${duration}ms: ${error.message}`
          );
        },
      })
    );
  }
}
