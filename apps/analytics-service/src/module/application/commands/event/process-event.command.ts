/**
 * Process Event Command
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class ProcessEventCommand extends BaseCommand {
  readonly type = 'analytics.event.process';

  constructor(public readonly eventId: string) {
    super();
  }
}
