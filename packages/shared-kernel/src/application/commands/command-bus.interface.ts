/**
 * Command Bus Interface
 * @module shared-kernel/application/commands
 *
 * References BaseCommand।
 */
import type { BaseCommand } from './base.command';

export interface CommandBus {
  execute<TResult = unknown>(command: BaseCommand): Promise<TResult>;
  register(commandType: string, handler: (command: BaseCommand) => Promise<unknown>): void;
}
