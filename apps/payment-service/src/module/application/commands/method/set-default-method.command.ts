import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class SetDefaultMethodCommand extends BaseCommand {
  readonly type = 'method.set-default';

  constructor(public readonly methodId: string) {
    super();
  }
}
