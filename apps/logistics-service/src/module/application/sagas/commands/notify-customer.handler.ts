import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Injectable, Logger } from '@nestjs/common';
import { NotifyCustomerCommand } from './notify-customer.command.js';

/**
 * NotifyCustomerHandler — saga-side command handler (placeholder)
 * TODO: wire to notification-service, order-service, etc.
 */
@Injectable()
@CommandHandler(NotifyCustomerCommand)
export class NotifyCustomerHandler implements ICommandHandler<NotifyCustomerCommand, { success: boolean }> {
  private readonly logger = new Logger(NotifyCustomerHandler.name);
  async execute(c: NotifyCustomerCommand): Promise<{ success: boolean }> {
    this.logger.log(`[NotifyCustomer] payload=${JSON.stringify(c.payload)}`);
    return { success: true };
  }
}
