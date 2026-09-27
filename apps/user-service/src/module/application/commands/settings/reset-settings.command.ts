/**
 * ResetSettingsCommand
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class ResetSettingsCommand extends BaseCommand {
  readonly type = 'settings.reset';

  constructor(public readonly userId: string) {
    super();
  }
}
