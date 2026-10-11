import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateTemplateCommand } from './update-template.command.js';
import { TEMPLATE_SERVICE, type ITemplateService } from '../../services/interfaces/template.service.interface.js';
import type { TemplateResponseDTO } from '../../dtos/responses/template-response.dto.js';

@CommandHandler(UpdateTemplateCommand)
export class UpdateTemplateHandler
  implements ICommandHandler<UpdateTemplateCommand, TemplateResponseDTO>
{
  constructor(@Inject(TEMPLATE_SERVICE) private readonly service: ITemplateService) {}

  async execute(c: UpdateTemplateCommand): Promise<TemplateResponseDTO> {
    return this.service.update(c.dto, c.actorId);
  }
}
