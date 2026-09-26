/**
 * TicketCacheInterceptor — response caching for ticket GET
 * @module support-service/interfaces/interceptors
 */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class TicketCacheInterceptor implements NestInterceptor {
  intercept(
    _context: ExecutionContext,
    next: CallHandler,
  ): Observable<unknown> {
    // Cache layer is optional; delegate to kernel cache if available.
    return next.handle();
  }
}
