import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ActivateTemplateCommand } from './activate-template.command.js';
import { TEMPLATE_SERVICE, type ITemplateService } from '../../services/interfaces/template.service.interface.js';
import type { TemplateResponseDTO } from '../../dtos/responses/template-response.dto.js';

@CommandHandler(ActivateTemplateCommand)
export class ActivateTemplateHandler
  implements ICommandHandler<ActivateTemplateCommand, TemplateResponseDTO>
{
  constructor(@Inject(TEMPLATE_SERVICE) private readonly service: ITemplateService) {}

  async execute(c: ActivateTemplateCommand): Promise<TemplateResponseDTO> {
    return this.service.activate(c.dto, c.actorId);
  }
}
