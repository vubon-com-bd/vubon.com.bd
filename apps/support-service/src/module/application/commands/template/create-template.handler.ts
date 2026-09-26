/**
 * CreateTemplateHandler
 * @module support-service/application/commands/template
 */
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { CreateTemplateCommand } from './create-template.command';
import type { TemplateResponseDTO } from '../../dtos/responses/template-response.dto';
import type { TemplateServiceInterface } from '../../services/interfaces/template.service.interface';

export class CreateTemplateHandler extends BaseCommandHandler<
  CreateTemplateCommand,
  TemplateResponseDTO
> {
  readonly commandType = 'support.template.create';

  constructor(private readonly templateService: TemplateServiceInterface) {
    super();
  }

  async execute(command: CreateTemplateCommand): Promise<TemplateResponseDTO> {
    return this.templateService.create(command.payload);
  }
}
