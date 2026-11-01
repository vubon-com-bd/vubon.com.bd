/**
 * InternalServicesModule — wires 6 internal services
 * @module logistics-service/infrastructure/services/internal
 */
import { Module } from '@nestjs/common';
import { RedisModule } from '@vubon/shared-kernel/infrastructure/persistence/cache';
import { IdempotencyService } from './idempotency.service.js';
import { ReferenceNumberService } from './reference-number.service.js';
import { CommissionCalculatorService } from './commission-calculator.service.js';
import { RefundCalculatorService } from './refund-calculator.service.js';
import { SignatureService } from './signature.service.js';
import { EncryptionService } from './encryption.service.js';

@Module({
  imports: [RedisModule],
  providers: [
    IdempotencyService,
    ReferenceNumberService,
    CommissionCalculatorService,
    RefundCalculatorService,
    SignatureService,
    EncryptionService,
  ],
  exports: [
    IdempotencyService,
    ReferenceNumberService,
    CommissionCalculatorService,
    RefundCalculatorService,
    SignatureService,
    EncryptionService,
  ],
})
export class InternalServicesModule {}
