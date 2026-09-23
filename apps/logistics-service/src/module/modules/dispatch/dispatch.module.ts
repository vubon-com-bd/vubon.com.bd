import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { DispatchController } from '../../interfaces/controllers/rest/dispatch.controller';
import { DispatchService } from '../../application/services/impl/dispatch.service';
import { DispatchMapper } from '../../application/mappers/dispatch.mapper';

import { CreateDispatchHandler } from '../../application/commands/dispatch/create-dispatch.handler';
import { AssignVehicleHandler } from '../../application/commands/dispatch/assign-vehicle.handler';
import { AssignDriverHandler } from '../../application/commands/dispatch/assign-driver.handler';
import { CompleteDispatchHandler } from '../../application/commands/dispatch/complete-dispatch.handler';

import { GetDispatchHandler } from '../../application/queries/dispatch/get-dispatch.handler';
import { ListDispatchesHandler } from '../../application/queries/dispatch/list-dispatches.handler';
import { ListDispatchesByVehicleHandler } from '../../application/queries/dispatch/list-dispatches-by-vehicle.handler';

import { DispatchPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/dispatch.prisma.repository';

@Module({
  imports: [CqrsModule],
  controllers: [DispatchController],
  providers: [
    DispatchPrismaRepository,
    DispatchService,
    DispatchMapper,
    CreateDispatchHandler,
    AssignVehicleHandler,
    AssignDriverHandler,
    CompleteDispatchHandler,
    GetDispatchHandler,
    ListDispatchesHandler,
    ListDispatchesByVehicleHandler,
  ],
  exports: [DispatchService, DispatchPrismaRepository],
})
export class DispatchModule {}
