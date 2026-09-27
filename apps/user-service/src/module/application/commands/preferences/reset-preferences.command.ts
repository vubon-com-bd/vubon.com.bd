/**
 * ResetPreferencesCommand
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class ResetPreferencesCommand extends BaseCommand {
  readonly type = 'preferences.reset';

  constructor(public readonly userId: string) {
    super();
  }
}
