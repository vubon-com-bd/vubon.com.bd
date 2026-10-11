import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class SendDigestSagaCommand extends BaseCommand {
  readonly type = 'saga.digest.send';
  constructor(
    public readonly digestId: string,
    public readonly userId: string,
    public readonly itemCount: number,
  ) {
    super();
  }
}
