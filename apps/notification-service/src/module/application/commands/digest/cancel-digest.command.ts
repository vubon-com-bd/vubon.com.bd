import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class CancelDigestCommand extends BaseCommand {
  readonly type = 'digest.cancel';
  constructor(public readonly digestId: string, public readonly actorId?: string) {
    super();
  }
}
