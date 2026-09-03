import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  private readonly logger = new Logger('Audit');

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest();
    const { method, url, user, ip } = request as {
      method: string;
      url: string;
      user?: { id?: string; sub?: string };
      ip?: string;
    };
    const userId = user?.id || user?.sub || 'anonymous';

    return next.handle().pipe(
      tap({
        next: (_data: unknown) => {
          this.logger.log({
            action: 'API_CALL',
            userId,
            method,
            url,
            ip,
            timestamp: new Date().toISOString(),
            status: 'SUCCESS',
          });
        },
        error: (error: Error) => {
          this.logger.error({
            action: 'API_CALL',
            userId,
            method,
            url,
            ip,
            timestamp: new Date().toISOString(),
            status: 'ERROR',
            error: error.message,
          });
        },
      })
    );
  }
}
