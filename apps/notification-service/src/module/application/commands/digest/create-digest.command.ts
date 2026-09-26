import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class CreateDigestCommand extends BaseCommand {
  readonly type = 'digest.create';

  constructor(
    public readonly userId: string,
    public readonly digestType: string,
    public readonly frequency: string,
    public readonly scheduledAt: string,
  ) {
    super();
  }
}
