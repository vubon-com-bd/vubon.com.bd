import { PrismaService } from '../../infrastructure/persistence/prisma/prisma.service';
import { PrismaModule, RedisModule } from '@vubon/shared-kernel/infrastructure';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { AuthDeviceController } from '../../interfaces/controllers/rest/auth-device.controller';
import { AuthDeviceService } from '../../application/services/impl/auth-device.service';
import { GetAuthDeviceHandler } from '../../application/queries/auth/get-auth-device.handler';
import { ListAuthDevicesHandler } from '../../application/queries/auth/list-auth-devices.handler';
import { AuthDevicePrismaRepository } from '../../infrastructure/persistence/prisma/repositories/auth-device.prisma.repository';
import { DeviceFingerprintService } from '../../infrastructure/services/internal/device-fingerprint.service';
import { DeviceGuard } from '../../interfaces/guards/device.guard';

@Module({
  imports: [CqrsModule, PrismaModule, RedisModule],
  controllers: [AuthDeviceController],
  providers: [PrismaService, { provide: 'PrismaService', useClass: PrismaService },
    { provide: 'AuthDeviceRepository', useExisting: AuthDevicePrismaRepository },
    { provide: 'DeviceFingerprintService', useExisting: DeviceFingerprintService },
    { provide: 'AuthDeviceService', useExisting: AuthDeviceService },
    { provide: 'DeviceGuard', useExisting: DeviceGuard },

    AuthDevicePrismaRepository,
    DeviceFingerprintService,
    AuthDeviceService,
    GetAuthDeviceHandler,
    ListAuthDevicesHandler,
    DeviceGuard,
  ],
  exports: [AuthDeviceService, AuthDevicePrismaRepository, DeviceGuard],
})
export class AuthDeviceModule {}
