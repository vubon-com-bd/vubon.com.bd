import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class ResetPreferencesCommand extends BaseCommand {
  readonly type = 'user.preferences.reset';

  constructor(public readonly userId: string) {
    super();
  }
}
