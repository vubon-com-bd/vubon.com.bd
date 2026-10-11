import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class RetrySmsCommand extends BaseCommand {
  readonly type = 'sms.retry';
  constructor(public readonly smsId: string, public readonly actorId?: string) {
    super();
  }
}
