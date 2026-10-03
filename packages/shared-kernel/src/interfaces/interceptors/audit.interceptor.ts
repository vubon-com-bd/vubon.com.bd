/**
 * Audit Interceptor
 * @module shared-kernel/interfaces/interceptors
 *
 * Uses STATUS from shared-constants।
 */
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import type { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { STATUS } from '@vubon/shared-constants/common';

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const started = Date.now();
    const handler = context.getHandler().name;
    const controller = context.getClass().name;

    return next.handle().pipe(
      tap({
        next: () => {
          const duration = Date.now() - started;
          // TODO: push to audit log store
          void {
            action: handler,
            resource: controller,
            status: STATUS.ACTIVE,
            duration,
            at: new Date().toISOString(),
          };
        },
      })
    );
  }
}
