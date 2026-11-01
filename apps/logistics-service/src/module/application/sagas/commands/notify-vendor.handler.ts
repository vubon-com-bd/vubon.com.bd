import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Injectable, Logger } from '@nestjs/common';
import { NotifyVendorCommand } from './notify-vendor.command.js';

/**
 * NotifyVendorHandler — saga-side command handler (placeholder)
 * TODO: wire to notification-service, order-service, etc.
 */
@Injectable()
@CommandHandler(NotifyVendorCommand)
export class NotifyVendorHandler implements ICommandHandler<NotifyVendorCommand, { success: boolean }> {
  private readonly logger = new Logger(NotifyVendorHandler.name);
  async execute(c: NotifyVendorCommand): Promise<{ success: boolean }> {
    this.logger.log(`[NotifyVendor] payload=${JSON.stringify(c.payload)}`);
    return { success: true };
  }
}
