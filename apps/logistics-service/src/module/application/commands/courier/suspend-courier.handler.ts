import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { SuspendCourierCommand } from './suspend-courier.command';
import type { CourierServiceInterface } from '../../services/interfaces/courier.service.interface';

@CommandHandler(SuspendCourierCommand)
export class SuspendCourierHandler
  extends BaseCommandHandler<SuspendCourierCommand, void>
  implements ICommandHandler<SuspendCourierCommand>
{
  readonly commandType = 'logistics.courier.suspend';

  constructor(private readonly courierService: CourierServiceInterface) {
    super();
  }

  async execute(command: SuspendCourierCommand): Promise<void> {
    await this.courierService.suspend({
      courierId: command.courierId,
      reason: command.reason,
    });
  }
}
