/**
 * WebhookRetryInterceptor — logs failures for later retry queue
 * @module payment-service/interfaces/interceptors
 *
 * Webhooks must respond 200 within 5s; on failure, queue retry.
 */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import type { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class WebhookRetryInterceptor implements NestInterceptor {
  private readonly logger = new Logger(WebhookRetryInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const req = context.switchToHttp().getRequest<{
      method: string;
      url: string;
      headers: Record<string, string | string[] | undefined>;
    }>();

    const provider = this.extractProvider(req.url);

    return next.handle().pipe(
      tap({
        error: (err: unknown) => {
          const msg = err instanceof Error ? err.message : 'unknown';
          this.logger.warn(
            `[webhook-retry] ${provider} ${req.method} ${req.url} FAILED: ${msg}`,
          );
          // TODO: enqueue retry via WebhookQueue (application layer)
        },
      }),
    );
  }

  private extractProvider(url: string): string {
    const match = url.match(/\/webhooks\/(\w+)/);
    return match?.[1] ?? 'unknown';
  }
}
