import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class UpdatePreferencesCommand extends BaseCommand {
  readonly type = 'user.preferences.update';

  constructor(
    public readonly userId: string,
    public readonly patch: Record<string, string>,
  ) {
    super();
  }
}
