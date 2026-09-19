import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class UpdateSettingsCommand extends BaseCommand {
  readonly type = 'user.update-settings';

  constructor(
    public readonly userId: string,
    public readonly theme?: string,
    public readonly language?: string,
    public readonly timezone?: string,
    public readonly notifications?: boolean,
  ) {
    super();
  }
}
