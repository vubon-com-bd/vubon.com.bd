import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Injectable, Logger } from '@nestjs/common';
import { ProcessRefundCommand } from './process-refund.command.js';

/**
 * ProcessRefundHandler — saga-side command handler (placeholder)
 * TODO: wire to notification-service, order-service, etc.
 */
@Injectable()
@CommandHandler(ProcessRefundCommand)
export class ProcessRefundHandler implements ICommandHandler<ProcessRefundCommand, { success: boolean }> {
  private readonly logger = new Logger(ProcessRefundHandler.name);
  async execute(c: ProcessRefundCommand): Promise<{ success: boolean }> {
    this.logger.log(`[ProcessRefund] payload=${JSON.stringify(c.payload)}`);
    return { success: true };
  }
}
