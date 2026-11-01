import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
export class UpdateVisibilityCommand extends BaseCommand {
  readonly type = 'user.update-visibility';
  readonly commandType = 'user.update-visibility';
  constructor(public readonly userId: string, public readonly visibility: string) { super(); }
}
