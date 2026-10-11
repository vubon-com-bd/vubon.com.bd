import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { RenderTemplateCommand } from './render-template.command.js';
import { TEMPLATE_SERVICE, type ITemplateService } from '../../services/interfaces/template.service.interface.js';
import type { TemplateRenderResponseDTO } from '../../dtos/responses/template-response.dto.js';

@CommandHandler(RenderTemplateCommand)
export class RenderTemplateHandler
  implements ICommandHandler<RenderTemplateCommand, TemplateRenderResponseDTO>
{
  constructor(@Inject(TEMPLATE_SERVICE) private readonly service: ITemplateService) {}

  async execute(c: RenderTemplateCommand): Promise<TemplateRenderResponseDTO> {
    return this.service.render(c.dto);
  }
}
