import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class UpdateSettingsCommand extends BaseCommand {
  readonly type = 'user.settings.update';

  constructor(
    public readonly userId: string,
    public readonly patch: Record<string, string>,
  ) {
    super();
  }
}
