/**
 * Filters Module
 * @module shared-kernel/modules/common
 */
import { Global, Module } from '@nestjs/common';
import {
  AllExceptionsFilter,
  DomainExceptionFilter,
  HttpExceptionFilter,
  ValidationExceptionFilter,
} from '../../interfaces/filters';

@Global()
@Module({
  providers: [
    AllExceptionsFilter,
    HttpExceptionFilter,
    ValidationExceptionFilter,
    DomainExceptionFilter,
  ],
  exports: [
    AllExceptionsFilter,
    HttpExceptionFilter,
    ValidationExceptionFilter,
    DomainExceptionFilter,
  ],
})
export class KernelFiltersModule {}
