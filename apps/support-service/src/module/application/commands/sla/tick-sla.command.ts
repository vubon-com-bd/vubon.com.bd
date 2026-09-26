/**
 * TickSlaCommand
 * @module support-service/application/commands/sla
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class TickSlaCommand extends BaseCommand {
  readonly type = 'support.sla.tick';

  constructor(
    public readonly slaId: string,
    public readonly elapsedMinutes: number,
  ) {
    super();
  }
}
