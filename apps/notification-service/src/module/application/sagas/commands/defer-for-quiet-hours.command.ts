import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class DeferForQuietHoursCommand extends BaseCommand {
  readonly type = 'saga.quiet_hours.defer';
  constructor(
    public readonly notificationId: string,
    public readonly userId: string,
    public readonly nextAllowedAt: string,
  ) {
    super();
  }
}
