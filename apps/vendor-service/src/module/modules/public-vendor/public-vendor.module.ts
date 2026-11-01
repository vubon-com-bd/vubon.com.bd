/**
 * PublicVendorModule — unauthenticated vendor endpoints
 * @module vendor-service/modules/public-vendor
 *
 * Imports VendorModule to access shared VENDOR_SERVICE and query handlers.
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventBridgeModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

import { PublicVendorController } from '../../interfaces/controllers/rest/public-vendor.controller.js';

// ⚠️ Re-use handlers & service from VendorModule
import { VendorModule } from '../vendor/index.js';

@Module({
  imports: [
    CqrsModule,
    EventBridgeModule,
    VendorModule,
  ],
  controllers: [PublicVendorController],
  providers: [],
})
export class PublicVendorModule {}
