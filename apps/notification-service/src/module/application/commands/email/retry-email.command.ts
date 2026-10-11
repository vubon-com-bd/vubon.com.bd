import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class RetryEmailCommand extends BaseCommand {
  readonly type = 'email.retry';
  constructor(
    public readonly emailId: string,
    public readonly actorId?: string,
  ) {
    super();
  }
}
