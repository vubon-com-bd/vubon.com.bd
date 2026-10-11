import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DeactivateTemplateCommand } from './deactivate-template.command.js';
import { TEMPLATE_SERVICE, type ITemplateService } from '../../services/interfaces/template.service.interface.js';
import type { TemplateResponseDTO } from '../../dtos/responses/template-response.dto.js';

@CommandHandler(DeactivateTemplateCommand)
export class DeactivateTemplateHandler
  implements ICommandHandler<DeactivateTemplateCommand, TemplateResponseDTO>
{
  constructor(@Inject(TEMPLATE_SERVICE) private readonly service: ITemplateService) {}

  async execute(c: DeactivateTemplateCommand): Promise<TemplateResponseDTO> {
    return this.service.deactivate(c.dto, c.actorId);
  }
}
