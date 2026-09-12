import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export abstract class BaseInterceptor implements NestInterceptor {
  abstract intercept(context: ExecutionContext, next: CallHandler): Observable<unknown>;

  protected getRequest(context: ExecutionContext): Record<string, unknown> {
    return context.switchToHttp().getRequest();
  }

  protected getResponse(context: ExecutionContext): Record<string, unknown> {
    return context.switchToHttp().getResponse();
  }
}
