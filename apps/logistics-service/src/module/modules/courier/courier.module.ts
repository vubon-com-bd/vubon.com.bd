import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { CourierController } from '../../interfaces/controllers/rest/courier.controller';
import { CourierService } from '../../application/services/impl/courier.service';
import { CourierMapper } from '../../application/mappers/courier.mapper';

import { RegisterCourierHandler } from '../../application/commands/courier/register-courier.handler';
import { UpdateCourierHandler } from '../../application/commands/courier/update-courier.handler';
import { SuspendCourierHandler } from '../../application/commands/courier/suspend-courier.handler';

import { GetCourierHandler } from '../../application/queries/courier/get-courier.handler';
import { ListCouriersHandler } from '../../application/queries/courier/list-couriers.handler';

import { CourierPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/courier.prisma.repository';
import { CourierCacheRepository } from '../../infrastructure/persistence/cache/repositories/courier.cache.repository';

@Module({
  imports: [CqrsModule],
  controllers: [CourierController],
  providers: [
    CourierPrismaRepository,
    CourierCacheRepository,
    CourierService,
    CourierMapper,
    RegisterCourierHandler,
    UpdateCourierHandler,
    SuspendCourierHandler,
    GetCourierHandler,
    ListCouriersHandler,
  ],
  exports: [CourierService, CourierPrismaRepository, CourierCacheRepository],
})
export class CourierModule {}
