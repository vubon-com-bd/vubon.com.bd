import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { AssignInventoryCommand } from './assign-inventory.command';

@CommandHandler(AssignInventoryCommand)
export class AssignInventoryHandler
  extends BaseCommandHandler<AssignInventoryCommand, void>
  implements ICommandHandler<AssignInventoryCommand>
{
  readonly commandType = 'logistics.warehouse.assign-inventory';

  constructor() {
    super();
  }

  async execute(command: AssignInventoryCommand): Promise<void> {
    void command;
    // Inventory assignment deferred to infrastructure layer
  }
}
