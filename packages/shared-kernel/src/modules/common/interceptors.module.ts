/**
 * Interceptors Module
 * @module shared-kernel/modules/common
 */
import { Global, Module } from '@nestjs/common';
import {
  AuditInterceptor,
  CacheInterceptor,
  CorrelationIdInterceptor,
  LoggingInterceptor,
  TimeoutInterceptor,
} from '../../interfaces/interceptors';

@Global()
@Module({
  providers: [
    AuditInterceptor,
    CacheInterceptor,
    LoggingInterceptor,
    CorrelationIdInterceptor,
    TimeoutInterceptor,
  ],
  exports: [
    AuditInterceptor,
    CacheInterceptor,
    LoggingInterceptor,
    CorrelationIdInterceptor,
    TimeoutInterceptor,
  ],
})
export class KernelInterceptorsModule {}
