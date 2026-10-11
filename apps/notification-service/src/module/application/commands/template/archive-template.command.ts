import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ArchiveTemplateRequestDTO } from '../../dtos/requests/template/template.dto.js';

export class ArchiveTemplateCommand extends BaseCommand {
  readonly type = 'template.archive';
  constructor(public readonly dto: ArchiveTemplateRequestDTO, public readonly actorId?: string) {
    super();
  }
}
