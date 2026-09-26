import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class UpdatePreferenceCommand extends BaseCommand {
  readonly type = 'preference.update';

  constructor(
    public readonly userId: string,
    public readonly preferenceType: string,
    public readonly option: string,
    public readonly value: string | boolean | number,
  ) {
    super();
  }
}
