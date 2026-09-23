import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { VehicleController } from '../../interfaces/controllers/rest/vehicle.controller';
import { VehicleService } from '../../application/services/impl/vehicle.service';
import { VehicleMapper } from '../../application/mappers/vehicle.mapper';

import { RegisterVehicleHandler } from '../../application/commands/vehicle/register-vehicle.handler';
import { UpdateVehicleHandler } from '../../application/commands/vehicle/update-vehicle.handler';
import { SetVehicleStatusHandler } from '../../application/commands/vehicle/set-vehicle-status.handler';

import { GetVehicleHandler } from '../../application/queries/vehicle/get-vehicle.handler';
import { ListVehiclesHandler } from '../../application/queries/vehicle/list-vehicles.handler';

import { VehiclePrismaRepository } from '../../infrastructure/persistence/prisma/repositories/vehicle.prisma.repository';

@Module({
  imports: [CqrsModule],
  controllers: [VehicleController],
  providers: [
    VehiclePrismaRepository,
    VehicleService,
    VehicleMapper,
    RegisterVehicleHandler,
    UpdateVehicleHandler,
    SetVehicleStatusHandler,
    GetVehicleHandler,
    ListVehiclesHandler,
  ],
  exports: [VehicleService, VehiclePrismaRepository],
})
export class VehicleModule {}
