import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Injectable, Logger } from '@nestjs/common';
import { UpdateOrderStatusCommand } from './update-order-status.command.js';

/**
 * UpdateOrderStatusHandler — saga-side command handler (placeholder)
 * TODO: wire to notification-service, order-service, etc.
 */
@Injectable()
@CommandHandler(UpdateOrderStatusCommand)
export class UpdateOrderStatusHandler implements ICommandHandler<UpdateOrderStatusCommand, { success: boolean }> {
  private readonly logger = new Logger(UpdateOrderStatusHandler.name);
  async execute(c: UpdateOrderStatusCommand): Promise<{ success: boolean }> {
    this.logger.log(`[UpdateOrderStatus] payload=${JSON.stringify(c.payload)}`);
    return { success: true };
  }
}
