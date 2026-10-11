import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateTemplateVersionCommand } from './create-template-version.command.js';
import { TEMPLATE_SERVICE, type ITemplateService } from '../../services/interfaces/template.service.interface.js';
import type { TemplateResponseDTO } from '../../dtos/responses/template-response.dto.js';

@CommandHandler(CreateTemplateVersionCommand)
export class CreateTemplateVersionHandler
  implements ICommandHandler<CreateTemplateVersionCommand, TemplateResponseDTO>
{
  constructor(@Inject(TEMPLATE_SERVICE) private readonly service: ITemplateService) {}

  async execute(c: CreateTemplateVersionCommand): Promise<TemplateResponseDTO> {
    return this.service.createVersion(c.dto, c.actorId);
  }
}
