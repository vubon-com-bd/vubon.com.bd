import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class ChatLogInterceptor implements NestInterceptor {
  private readonly logger = new Logger(ChatLogInterceptor.name);

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<unknown> {
    const request = context
      .switchToHttp()
      .getRequest<{ method: string; url: string }>();

    return next.handle().pipe(
      tap(() => {
        this.logger.debug(`Chat operation: ${request.method} ${request.url}`);
      }),
    );
  }
}
