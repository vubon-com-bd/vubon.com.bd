/**
 * UpdateTemplateHandler
 * @module support-service/application/commands/template
 */
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UpdateTemplateCommand } from './update-template.command';
import type { TemplateResponseDTO } from '../../dtos/responses/template-response.dto';
import type { TemplateServiceInterface } from '../../services/interfaces/template.service.interface';

export class UpdateTemplateHandler extends BaseCommandHandler<
  UpdateTemplateCommand,
  TemplateResponseDTO
> {
  readonly commandType = 'support.template.update';

  constructor(private readonly templateService: TemplateServiceInterface) {
    super();
  }

  async execute(command: UpdateTemplateCommand): Promise<TemplateResponseDTO> {
    return this.templateService.update(command.payload);
  }
}
