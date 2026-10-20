/**
 * VendorModule — main vendor feature wiring
 * @module vendor-service/modules/vendor
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventBridgeModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

// Controller
import { VendorController } from '../../interfaces/controllers/rest/vendor.controller.js';

// Handler arrays
import { VENDOR_COMMAND_HANDLERS } from './commands/index.js';
import { VENDOR_QUERY_HANDLERS } from './queries/index.js';
import { VENDOR_EVENT_HANDLERS } from './events/index.js';
import { VENDOR_SAGAS } from './sagas/index.js';

// Service (with DI token)
import { VendorService } from '../../application/services/impl/vendor.service.js';
import { VENDOR_SERVICE } from '../../application/services/interfaces/vendor.service.interface.js';

// Guards / Interceptors
import { OwnVendorGuard } from '../../interfaces/guards/own-vendor.guard.js';
import { VendorCacheInterceptor } from '../../interfaces/interceptors/vendor-cache.interceptor.js';

// External Event Handlers
import { UserCreatedHandler } from '../../application/events/external/user-created.handler.js';

// Feature health
import { VendorFeatureHealthIndicator } from './health/index.js';

@Module({
  imports: [CqrsModule, EventBridgeModule],
  controllers: [VendorController],
  providers: [
    // Service (with DI token)
    VendorService,
    { provide: VENDOR_SERVICE, useExisting: VendorService },

    // Command Handlers
    ...(VENDOR_COMMAND_HANDLERS as readonly unknown[] as never[]),

    // Query Handlers
    ...(VENDOR_QUERY_HANDLERS as readonly unknown[] as never[]),

    // Event Handlers
    ...(VENDOR_EVENT_HANDLERS as readonly unknown[] as never[]),

    // Sagas
    ...(VENDOR_SAGAS as readonly unknown[] as never[]),

    // Guards / Interceptors
    OwnVendorGuard,
    VendorCacheInterceptor,

    // External Event Handlers
    UserCreatedHandler,

    // Feature health
    VendorFeatureHealthIndicator,
  ],
  exports: [VendorService, VENDOR_SERVICE, VendorFeatureHealthIndicator],
})
export class VendorModule {}
