import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class WebhookRetryInterceptor implements NestInterceptor {
  private readonly logger = new Logger(WebhookRetryInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      catchError((error: unknown) => {
        const req = context.switchToHttp().getRequest<{ url?: string }>();
        this.logger.error(`Webhook processing failed: ${req.url ?? 'unknown'}`, error);
        // Still rethrow so we can decide retry at queue level
        return throwError(() => error);
      }),
    );
  }
}
