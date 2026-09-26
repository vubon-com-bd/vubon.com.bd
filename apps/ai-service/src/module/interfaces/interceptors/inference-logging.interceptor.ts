import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class InferenceLoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(InferenceLoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<{
      method: string;
      url: string;
      user?: { userId?: string };
    }>();
    const start = Date.now();

    return next.handle().pipe(
      tap({
        next: () => {
          const latencyMs = Date.now() - start;
          this.logger.log(
            `${request.method} ${request.url} — ${latencyMs}ms — user=${request.user?.userId ?? 'anon'}`,
          );
        },
        error: (error: unknown) => {
          const latencyMs = Date.now() - start;
          this.logger.warn(
            `${request.method} ${request.url} FAILED — ${latencyMs}ms — ${error instanceof Error ? error.message : String(error)}`,
          );
        },
      }),
    );
  }
}
