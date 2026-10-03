/**
 * Base Command
 * @module shared-kernel/application/commands
 *
 * Pure abstraction — কোনো external import নেই।
 */
export abstract class BaseCommand {
  abstract readonly type: string;
  readonly timestamp: Date = new Date();
  readonly commandId: string;

  protected constructor() {
    this.commandId = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  }
}
