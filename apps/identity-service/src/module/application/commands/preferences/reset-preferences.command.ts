import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
export class ResetPreferencesCommand extends BaseCommand {
  readonly type = 'user.reset-preferences';
  readonly commandType = 'user.reset-preferences';
  constructor(
    public readonly userId: string,
    public readonly scope: 'all' | 'marketing' | 'promotions',
  ) { super(); }
}
