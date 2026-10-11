import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DeprecateTemplateCommand } from './deprecate-template.command.js';
import { TEMPLATE_SERVICE, type ITemplateService } from '../../services/interfaces/template.service.interface.js';
import type { TemplateResponseDTO } from '../../dtos/responses/template-response.dto.js';

@CommandHandler(DeprecateTemplateCommand)
export class DeprecateTemplateHandler
  implements ICommandHandler<DeprecateTemplateCommand, TemplateResponseDTO>
{
  constructor(@Inject(TEMPLATE_SERVICE) private readonly service: ITemplateService) {}

  async execute(c: DeprecateTemplateCommand): Promise<TemplateResponseDTO> {
    return this.service.deprecate(c.dto, c.actorId);
  }
}
