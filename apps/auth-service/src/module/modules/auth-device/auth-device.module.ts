import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthDeviceController } from '../../interfaces/controllers/rest/auth-device.controller';
import { GetAuthDeviceHandler } from '../../application/queries/auth/get-auth-device.handler';
import { ListAuthDevicesHandler } from '../../application/queries/auth/list-auth-devices.handler';
import { AuthDevicePrismaRepository } from '../../infrastructure/persistence/prisma/repositories/auth-device.prisma.repository';
import { DeviceGuard } from '../../interfaces/guards/device.guard';
import { AUTH_DEVICE_REPO } from '../../application/services/tokens';

const TOKEN_BINDINGS = [
  { provide: AUTH_DEVICE_REPO, useExisting: AuthDevicePrismaRepository },
];

@Module({
  imports: [CqrsModule],
  controllers: [AuthDeviceController],
  providers: [
    AuthDevicePrismaRepository,
    GetAuthDeviceHandler,
    ListAuthDevicesHandler,
    DeviceGuard,
    ...TOKEN_BINDINGS,
  ],
  exports: [
    AuthDevicePrismaRepository,
    DeviceGuard,
    ...TOKEN_BINDINGS.map((b) => b.provide),
  ],
})
export class AuthDeviceModule {}
