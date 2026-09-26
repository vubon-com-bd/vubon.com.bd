import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { DeviceController } from '../../interfaces/controllers/rest/device.controller';

// Services
import { DeviceService } from '../../application/services/impl/device.service';
import { DeviceTokenService } from '../../application/services/impl/device-token.service';
import { DeviceTokenValidatorService } from '../../infrastructure/services/internal';

// Repositories
import { DevicePrismaRepository } from '../../infrastructure/persistence/prisma/repositories/device.prisma.repository';
import { DeviceTokenPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/device-token.prisma.repository';
import { DeviceCacheRepository } from '../../infrastructure/persistence/cache/repositories/device.cache.repository';

// Command handlers
import {
  RegisterDeviceHandler,
  UpdateDeviceTokenHandler,
  UnregisterDeviceHandler,
} from '../../application/commands/device';

// Query handlers
import {
  GetDeviceHandler,
  ListDevicesHandler,
} from '../../application/queries/device';

@Module({
  imports: [CqrsModule],
  controllers: [DeviceController],
  providers: [
    // Repositories
    DevicePrismaRepository,
    DeviceTokenPrismaRepository,
    DeviceCacheRepository,

    // Services
    DeviceService,
    DeviceTokenService,
    DeviceTokenValidatorService,

    // Command handlers
    RegisterDeviceHandler,
    UpdateDeviceTokenHandler,
    UnregisterDeviceHandler,

    // Query handlers
    GetDeviceHandler,
    ListDevicesHandler,
  ],
  exports: [
    DeviceService,
    DeviceTokenService,
    DevicePrismaRepository,
    DeviceTokenPrismaRepository,
    DeviceCacheRepository,
  ],
})
export class DeviceModule {}
