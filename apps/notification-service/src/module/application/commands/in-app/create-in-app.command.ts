import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CreateInAppCommandDTO } from '@application/dtos/requests/in-app/index.js';

export class CreateInAppCommand extends BaseCommand {
  readonly type = 'notification.in_app.create';
  constructor(public readonly dto: CreateInAppCommandDTO, public readonly actorId?: string) { super(); }
}
