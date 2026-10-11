import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ArchiveTemplateCommand } from './archive-template.command.js';
import { TEMPLATE_SERVICE, type ITemplateService } from '../../services/interfaces/template.service.interface.js';
import type { TemplateResponseDTO } from '../../dtos/responses/template-response.dto.js';

@CommandHandler(ArchiveTemplateCommand)
export class ArchiveTemplateHandler
  implements ICommandHandler<ArchiveTemplateCommand, TemplateResponseDTO>
{
  constructor(@Inject(TEMPLATE_SERVICE) private readonly service: ITemplateService) {}

  async execute(c: ArchiveTemplateCommand): Promise<TemplateResponseDTO> {
    return this.service.archive(c.dto, c.actorId);
  }
}
