/**
 * UpdateOrderStatusHandler — stub (cross-service order update)
 * @module payment-service/application/commands/saga-commands
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { UpdateOrderStatusCommand } from '@application/sagas/commands/update-order-status.command';

@CommandHandler(UpdateOrderStatusCommand)
export class UpdateOrderStatusHandler
  implements ICommandHandler<UpdateOrderStatusCommand, void>
{
  private readonly logger = new Logger(UpdateOrderStatusHandler.name);

  async execute(c: UpdateOrderStatusCommand): Promise<void> {
    this.logger.debug(
      `[order-status-stub] order=${c.orderId} status=${c.newStatus} reason=${c.reason ?? 'n/a'} → order-service`,
    );
  }
}
