import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Injectable, Logger } from '@nestjs/common';
import { ReleaseInventoryCommand } from './release-inventory.command.js';

/**
 * ReleaseInventoryHandler — saga-side command handler (placeholder)
 * TODO: wire to notification-service, order-service, etc.
 */
@Injectable()
@CommandHandler(ReleaseInventoryCommand)
export class ReleaseInventoryHandler implements ICommandHandler<ReleaseInventoryCommand, { success: boolean }> {
  private readonly logger = new Logger(ReleaseInventoryHandler.name);
  async execute(c: ReleaseInventoryCommand): Promise<{ success: boolean }> {
    this.logger.log(`[ReleaseInventory] payload=${JSON.stringify(c.payload)}`);
    return { success: true };
  }
}
