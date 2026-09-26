import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { DriverController } from '../../interfaces/controllers/rest/driver.controller';
import { DriverService } from '../../application/services/impl/driver.service';
import { DriverMapper } from '../../application/mappers/driver.mapper';

import { RegisterDriverHandler } from '../../application/commands/driver/register-driver.handler';
import { UpdateDriverHandler } from '../../application/commands/driver/update-driver.handler';
import { SetDriverStatusHandler } from '../../application/commands/driver/set-driver-status.handler';

import { GetDriverHandler } from '../../application/queries/driver/get-driver.handler';
import { ListDriversHandler } from '../../application/queries/driver/list-drivers.handler';

import { DriverPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/driver.prisma.repository';

@Module({
  imports: [CqrsModule],
  controllers: [DriverController],
  providers: [
    DriverPrismaRepository,
    DriverService,
    DriverMapper,
    RegisterDriverHandler,
    UpdateDriverHandler,
    SetDriverStatusHandler,
    GetDriverHandler,
    ListDriversHandler,
  ],
  exports: [DriverService, DriverPrismaRepository],
})
export class DriverModule {}
