import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { TestTemplateCommandDTO } from '@application/dtos/requests/template/index.js';

export class TestTemplateCommand extends BaseCommand {
  readonly type = 'notification.template.test';
  constructor(public readonly dto: TestTemplateCommandDTO, public readonly actorId?: string) { super(); }
}
