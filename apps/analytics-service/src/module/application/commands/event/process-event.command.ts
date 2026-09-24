import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class ProcessEventCommand extends BaseCommand {
  readonly type = 'analytics.event.process';

  constructor(public readonly eventId: string) {
    super();
  }
}
