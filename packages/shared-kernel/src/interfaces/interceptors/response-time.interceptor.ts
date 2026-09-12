import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class ResponseTimeInterceptor implements NestInterceptor {
  private readonly logger = new Logger('ResponseTime');

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest();
    const start = Date.now();

    this.logger.debug(`Request started at: ${new Date(start).toISOString()}`);

    return next.handle().pipe(
      tap(() => {
        const duration = Date.now() - start;
        const response = context.switchToHttp().getResponse();
        response.setHeader('X-Response-Time', `${duration}ms`);

        this.logger.log(`${request.method} ${request.url} - ${duration}ms`);
      })
    );
  }
}
