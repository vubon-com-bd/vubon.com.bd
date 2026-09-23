import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { AssignDriverCommand } from './assign-driver.command';
import type { DispatchServiceInterface } from '../../services/interfaces/dispatch.service.interface';
import type { DispatchResponseDTO } from '../../dtos/responses/dispatch-response.dto';

@CommandHandler(AssignDriverCommand)
export class AssignDriverHandler
  extends BaseCommandHandler<AssignDriverCommand, DispatchResponseDTO>
  implements ICommandHandler<AssignDriverCommand>
{
  readonly commandType = 'logistics.dispatch.assign-driver';

  constructor(private readonly dispatchService: DispatchServiceInterface) {
    super();
  }

  async execute(command: AssignDriverCommand): Promise<DispatchResponseDTO> {
    return this.dispatchService.assignDriver({
      dispatchId: command.dispatchId,
      driverId: command.driverId,
    });
  }
}
