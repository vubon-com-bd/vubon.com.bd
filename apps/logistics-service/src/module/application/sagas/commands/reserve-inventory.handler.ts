import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Injectable, Logger } from '@nestjs/common';
import { ReserveInventoryCommand } from './reserve-inventory.command.js';

/**
 * ReserveInventoryHandler — saga-side command handler (placeholder)
 * TODO: wire to notification-service, order-service, etc.
 */
@Injectable()
@CommandHandler(ReserveInventoryCommand)
export class ReserveInventoryHandler implements ICommandHandler<ReserveInventoryCommand, { success: boolean }> {
  private readonly logger = new Logger(ReserveInventoryHandler.name);
  async execute(c: ReserveInventoryCommand): Promise<{ success: boolean }> {
    this.logger.log(`[ReserveInventory] payload=${JSON.stringify(c.payload)}`);
    return { success: true };
  }
}
