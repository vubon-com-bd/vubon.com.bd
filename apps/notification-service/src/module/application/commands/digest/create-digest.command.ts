import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CreateDigestCommandDTO } from '@application/dtos/requests/digest/index.js';

export class CreateDigestCommand extends BaseCommand {
  readonly type = 'notification.digest.create';
  constructor(public readonly dto: CreateDigestCommandDTO, public readonly actorId?: string) { super(); }
}
