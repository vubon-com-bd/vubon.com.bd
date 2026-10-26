import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CreateTemplateCommandDTO } from '@application/dtos/requests/template/index.js';

export class CreateTemplateCommand extends BaseCommand {
  readonly type = 'notification.template.create';
  constructor(public readonly dto: CreateTemplateCommandDTO, public readonly actorId?: string) { super(); }
}
