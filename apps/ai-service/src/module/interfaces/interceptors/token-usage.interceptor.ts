import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import type { AiAnalyticsServiceInterface } from '../../application/services/interfaces/ai-analytics.service.interface';

interface ResponseWithUsage {
  readonly tokensUsed?: number;
  readonly tokenCount?: number;
  readonly provider?: string;
  readonly model?: string;
}

@Injectable()
export class TokenUsageInterceptor implements NestInterceptor {
  private readonly logger = new Logger(TokenUsageInterceptor.name);

  constructor(
    private readonly analyticsService: AiAnalyticsServiceInterface,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context
      .switchToHttp()
      .getRequest<{ user?: { userId?: string } }>();
    const userId = request.user?.userId;

    return next.handle().pipe(
      tap((response) => {
        const usage = response as ResponseWithUsage | undefined;
        const tokens = usage?.tokensUsed ?? usage?.tokenCount ?? 0;
        if (!userId || tokens <= 0) return;

        void this.analyticsService
          .record('token_usage', usage?.model ?? null, { tokens })
          .catch((error: unknown) => {
            this.logger.warn(
              `Token usage tracking failed: ${error instanceof Error ? error.message : String(error)}`,
            );
          });
      }),
    );
  }
}
