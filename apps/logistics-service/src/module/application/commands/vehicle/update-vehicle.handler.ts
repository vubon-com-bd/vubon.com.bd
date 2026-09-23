import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UpdateVehicleCommand } from './update-vehicle.command';
import type { VehicleServiceInterface } from '../../services/interfaces/vehicle.service.interface';
import type { VehicleResponseDTO } from '../../dtos/responses/vehicle-response.dto';

type FuelType = 'petrol' | 'diesel' | 'cng' | 'electric' | 'hybrid';

@CommandHandler(UpdateVehicleCommand)
export class UpdateVehicleHandler
  extends BaseCommandHandler<UpdateVehicleCommand, VehicleResponseDTO>
  implements ICommandHandler<UpdateVehicleCommand>
{
  readonly commandType = 'logistics.vehicle.update';

  constructor(private readonly vehicleService: VehicleServiceInterface) {
    super();
  }

  async execute(command: UpdateVehicleCommand): Promise<VehicleResponseDTO> {
    return this.vehicleService.update({
      vehicleId: command.vehicleId,
      capacity: command.capacity,
      fuelType: command.fuelType as FuelType | undefined,
    } as never);
  }
}
