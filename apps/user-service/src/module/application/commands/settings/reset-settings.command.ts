import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class ResetSettingsCommand extends BaseCommand {
  readonly type = 'user.settings.reset';

  constructor(public readonly userId: string) {
    super();
  }
}
