/**
 * Base Command Handler
 * @module shared-kernel/application/commands
 *
 * References BaseCommand।
 */
import type { BaseCommand } from './base.command';

export abstract class BaseCommandHandler<
  TCommand extends BaseCommand = BaseCommand,
  TResult = unknown,
> {
  abstract readonly commandType: string;
  abstract execute(command: TCommand): Promise<TResult>;
}
