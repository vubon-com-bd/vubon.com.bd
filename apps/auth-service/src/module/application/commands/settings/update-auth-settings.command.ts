import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class UpdateAuthSettingsCommand extends BaseCommand {
  readonly type = 'settings.update-auth';

  constructor(
    public readonly userId: string,
    public readonly mfaRequired?: boolean,
    public readonly sessionTimeoutMinutes?: number,
    public readonly passwordExpiryDays?: number,
    public readonly loginNotifications?: boolean,
  ) {
    super();
  }
}
