import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class TrackEventCommand extends BaseCommand {
  readonly type = 'analytics.event.track';

  constructor(
    public readonly name: string,
    public readonly source: string,
    public readonly payload: Record<string, unknown>,
    public readonly userId?: string,
    public readonly sessionId?: string,
    public readonly occurredAt?: string,
  ) {
    super();
  }
}
