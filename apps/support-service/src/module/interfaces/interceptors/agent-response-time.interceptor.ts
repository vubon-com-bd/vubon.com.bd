import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class AgentResponseTimeInterceptor implements NestInterceptor {
  private readonly logger = new Logger(AgentResponseTimeInterceptor.name);

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<unknown> {
    const start = Date.now();
    const request = context
      .switchToHttp()
      .getRequest<{ method: string; url: string; user?: { userId?: string } }>();

    return next.handle().pipe(
      tap({
        next: () => {
          const duration = Date.now() - start;
          this.logger.debug(
            `${request.method} ${request.url} — ${duration}ms (user: ${request.user?.userId ?? 'anon'})`,
          );
        },
        error: (err: unknown) => {
          const duration = Date.now() - start;
          this.logger.warn(
            `${request.method} ${request.url} failed after ${duration}ms: ${
              err instanceof Error ? err.message : 'unknown'
            }`,
          );
        },
      }),
    );
  }
}
