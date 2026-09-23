import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { SetVehicleStatusCommand } from './set-vehicle-status.command';
import type { VehicleServiceInterface } from '../../services/interfaces/vehicle.service.interface';
import type { VehicleResponseDTO } from '../../dtos/responses/vehicle-response.dto';

@CommandHandler(SetVehicleStatusCommand)
export class SetVehicleStatusHandler
  extends BaseCommandHandler<SetVehicleStatusCommand, VehicleResponseDTO>
  implements ICommandHandler<SetVehicleStatusCommand>
{
  readonly commandType = 'logistics.vehicle.set-status';

  constructor(private readonly vehicleService: VehicleServiceInterface) {
    super();
  }

  async execute(command: SetVehicleStatusCommand): Promise<VehicleResponseDTO> {
    return this.vehicleService.setStatus({
      vehicleId: command.vehicleId,
      status: command.status,
    } as never);
  }
}
