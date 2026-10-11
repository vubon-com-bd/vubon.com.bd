import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateTemplateCommand } from './create-template.command.js';
import { TEMPLATE_SERVICE, type ITemplateService } from '../../services/interfaces/template.service.interface.js';
import type { TemplateResponseDTO } from '../../dtos/responses/template-response.dto.js';

@CommandHandler(CreateTemplateCommand)
export class CreateTemplateHandler
  implements ICommandHandler<CreateTemplateCommand, TemplateResponseDTO>
{
  constructor(@Inject(TEMPLATE_SERVICE) private readonly service: ITemplateService) {}

  async execute(c: CreateTemplateCommand): Promise<TemplateResponseDTO> {
    return this.service.create(c.dto, c.actorId);
  }
}
