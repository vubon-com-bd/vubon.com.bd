import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class CancelEmailCommand extends BaseCommand {
  readonly type = 'email.cancel';
  constructor(
    public readonly emailId: string,
    public readonly actorId?: string,
  ) {
    super();
  }
}
