/**
 * CleanupExpiredHandler — handles CleanupExpiredCommand
 * @module notification-service/application/sagas/commands
 *
 * Deletes expired notifications that haven't been delivered.
 * Runs periodically via saga or scheduled worker.
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { CleanupExpiredCommand } from './cleanup-expired.command.js';

@CommandHandler(CleanupExpiredCommand)
export class CleanupExpiredHandler implements ICommandHandler<CleanupExpiredCommand> {
  private readonly logger = new Logger(CleanupExpiredHandler.name);

  async execute(command: CleanupExpiredCommand): Promise<{ deleted: number }> {
    this.logger.debug(
      `CleanupExpiredCommand received — cutoffDate=${command.cutoffDate}`,
    );

    // In-memory mode: no-op (nothing to delete)
    // Production: would delete notifications WHERE createdAt < cutoffDate AND status='pending'
    this.logger.log(
      `Cleanup executed (cutoff=${command.cutoffDate}) — 0 records deleted (memory mode)`,
    );

    return { deleted: 0 };
  }
}
