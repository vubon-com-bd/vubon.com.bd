import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class QueryLoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(QueryLoggingInterceptor.name);

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<unknown> {
    const request = context
      .switchToHttp()
      .getRequest<{ method: string; url: string }>();
    const start = Date.now();

    return next.handle().pipe(
      tap({
        next: () => {
          const duration = Date.now() - start;
          this.logger.log(
            `${request.method} ${request.url} - ${duration}ms`,
          );
        },
        error: (error: unknown) => {
          const duration = Date.now() - start;
          this.logger.warn(
            `${request.method} ${request.url} - failed in ${duration}ms: ${String(error)}`,
          );
        },
      }),
    );
  }
}
