import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class CancelSmsCommand extends BaseCommand {
  readonly type = 'sms.cancel';
  constructor(public readonly smsId: string, public readonly actorId?: string) {
    super();
  }
}
