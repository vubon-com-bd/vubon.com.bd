import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { AssignVehicleCommand } from './assign-vehicle.command';
import type { DispatchServiceInterface } from '../../services/interfaces/dispatch.service.interface';
import type { DispatchResponseDTO } from '../../dtos/responses/dispatch-response.dto';

@CommandHandler(AssignVehicleCommand)
export class AssignVehicleHandler
  extends BaseCommandHandler<AssignVehicleCommand, DispatchResponseDTO>
  implements ICommandHandler<AssignVehicleCommand>
{
  readonly commandType = 'logistics.dispatch.assign-vehicle';

  constructor(private readonly dispatchService: DispatchServiceInterface) {
    super();
  }

  async execute(command: AssignVehicleCommand): Promise<DispatchResponseDTO> {
    return this.dispatchService.assignVehicle({
      dispatchId: command.dispatchId,
      vehicleId: command.vehicleId,
    });
  }
}
