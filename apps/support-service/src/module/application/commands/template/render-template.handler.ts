/**
 * RenderTemplateHandler
 * @module support-service/application/commands/template
 */
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { RenderTemplateCommand } from './render-template.command';
import type { TemplateServiceInterface } from '../../services/interfaces/template.service.interface';

export interface RenderedTemplateDTO {
  readonly templateId: string;
  readonly text: string;
}

export class RenderTemplateHandler extends BaseCommandHandler<
  RenderTemplateCommand,
  RenderedTemplateDTO
> {
  readonly commandType = 'support.template.render';

  constructor(private readonly templateService: TemplateServiceInterface) {
    super();
  }

  async execute(command: RenderTemplateCommand): Promise<RenderedTemplateDTO> {
    const text = await this.templateService.render(command.templateId, command.values);
    return { templateId: command.templateId, text };
  }
}
