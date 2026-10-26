import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { SendDigestCommandDTO } from '@application/dtos/requests/digest/index.js';

export class SendDigestCommand extends BaseCommand {
  readonly type = 'notification.digest.send';
  constructor(public readonly dto: SendDigestCommandDTO, public readonly actorId?: string) { super(); }
}
