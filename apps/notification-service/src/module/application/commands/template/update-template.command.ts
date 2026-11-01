import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { UpdateTemplateCommandDTO } from '@application/dtos/requests/template/index.js';

export class UpdateTemplateCommand extends BaseCommand {
  readonly type = 'notification.template.update';
  constructor(public readonly dto: UpdateTemplateCommandDTO, public readonly actorId?: string) { super(); }
}
