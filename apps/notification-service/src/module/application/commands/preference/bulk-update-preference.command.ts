import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export interface PreferenceUpdateItem {
  readonly type: string;
  readonly option: string;
  readonly value: string | boolean | number;
}

export class BulkUpdatePreferenceCommand extends BaseCommand {
  readonly type = 'preference.bulk-update';

  constructor(
    public readonly userId: string,
    public readonly updates: readonly PreferenceUpdateItem[],
  ) {
    super();
  }
}
