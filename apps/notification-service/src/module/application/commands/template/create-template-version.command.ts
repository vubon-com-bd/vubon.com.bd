import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CreateTemplateVersionRequestDTO } from '../../dtos/requests/template/template.dto.js';

export class CreateTemplateVersionCommand extends BaseCommand {
  readonly type = 'template.create_version';
  constructor(public readonly dto: CreateTemplateVersionRequestDTO, public readonly actorId?: string) {
    super();
  }
}
