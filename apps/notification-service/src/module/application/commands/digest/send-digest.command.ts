import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class SendDigestCommand extends BaseCommand {
  readonly type = 'digest.send';

  constructor(public readonly digestId: string) {
    super();
  }
}
