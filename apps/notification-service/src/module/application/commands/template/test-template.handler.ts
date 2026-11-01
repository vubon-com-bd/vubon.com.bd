import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { TestTemplateCommand } from './test-template.command.js';
import {
  TEMPLATE_SERVICE,
  type ITemplateService,
} from '@application/services/interfaces/template.service.interface.js';
import type { TemplateRenderResponseDTO } from '@application/dtos/responses/template-response.dto.js';

@CommandHandler(TestTemplateCommand)
export class TestTemplateHandler
  implements ICommandHandler<TestTemplateCommand, TemplateRenderResponseDTO>
{
  constructor(@Inject(TEMPLATE_SERVICE) private readonly service: ITemplateService) {}

  async execute(c: TestTemplateCommand): Promise<TemplateRenderResponseDTO> {
    return this.service.test(c.dto, c.actorId);
  }
}
