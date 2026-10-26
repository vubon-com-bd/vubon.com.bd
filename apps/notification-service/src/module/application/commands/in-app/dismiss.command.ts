import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { DismissInAppCommandDTO } from '@application/dtos/requests/in-app/index.js';

export class DismissInAppCommand extends BaseCommand {
  readonly type = 'notification.in_app.dismiss';
  constructor(public readonly dto: DismissInAppCommandDTO, public readonly actorId?: string) { super(); }
}
