import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { RegisterVehicleCommand } from './register-vehicle.command';
import type { VehicleServiceInterface } from '../../services/interfaces/vehicle.service.interface';
import type { VehicleResponseDTO } from '../../dtos/responses/vehicle-response.dto';

@CommandHandler(RegisterVehicleCommand)
export class RegisterVehicleHandler
  extends BaseCommandHandler<RegisterVehicleCommand, VehicleResponseDTO>
  implements ICommandHandler<RegisterVehicleCommand>
{
  readonly commandType = 'logistics.vehicle.register';

  constructor(private readonly vehicleService: VehicleServiceInterface) {
    super();
  }

  async execute(command: RegisterVehicleCommand): Promise<VehicleResponseDTO> {
    return this.vehicleService.register({
      vehicleNumber: command.vehicleNumber,
      type: command.vehicleType,
      capacity: command.capacity,
      fuelType: command.fuelType,
    } as never);
  }
}
