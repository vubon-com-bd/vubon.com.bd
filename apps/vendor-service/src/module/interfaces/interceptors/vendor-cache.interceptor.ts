import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { VendorCacheRepository } from '../../infrastructure/persistence/cache/repositories/vendor.cache.repository';
import { VendorIdVO } from '../../domain/value-objects/primitives/vendor-id.vo';

interface RequestWithParams {
  method: string;
  params: { id?: string };
}

@Injectable()
export class VendorCacheInterceptor implements NestInterceptor {
  constructor(private readonly cache: VendorCacheRepository) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<unknown>> {
    const request = context.switchToHttp().getRequest<RequestWithParams>();
    if (request.method !== 'GET') return next.handle();

    const vendorId = request.params.id;
    if (!vendorId) return next.handle();

    const cached = await this.cache.findById(VendorIdVO.create(vendorId));
    if (cached) return of(cached);

    return next.handle().pipe(
      tap((data) => {
        void data;
      }),
    );
  }
}
