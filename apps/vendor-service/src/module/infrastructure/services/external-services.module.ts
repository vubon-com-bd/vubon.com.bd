/**
 * ExternalServicesModule — wires all external services
 * @module vendor-service/infrastructure/services
 */
import { Module } from '@nestjs/common';
import { RedisModule } from '@vubon/shared-kernel/infrastructure/persistence/cache';

import { BankAccountVerifierService } from './external/bank-account-verifier.service.js';
import { FileStorageService } from './external/file-storage.service.js';
import { VendorNotificationService } from './external/vendor-notification.service.js';
import { VendorAnalyticsService } from './external/vendor-analytics.service.js';
import { VendorSlugReservationService } from './external/vendor-slug-reservation.service.js';

const SERVICES = [
  BankAccountVerifierService,
  FileStorageService,
  VendorNotificationService,
  VendorAnalyticsService,
  VendorSlugReservationService,
];

@Module({
  imports: [RedisModule],
  providers: [...SERVICES],
  exports: [...SERVICES],
})
export class ExternalServicesModule {}
