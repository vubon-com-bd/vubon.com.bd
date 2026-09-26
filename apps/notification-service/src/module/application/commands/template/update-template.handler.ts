import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UpdateTemplateCommand } from './update-template.command';
import type { TemplateResponseDTO } from '../../dtos/responses/template-response.dto';
import type { TemplateRepository } from '../../../domain/repositories/template.repository.interface';
import { TemplateIdVO } from '../../../domain/value-objects/primitives/template-id.vo';
import { TemplateContentVO } from '../../../domain/value-objects/primitives/template-content.vo';
import { TemplateEntity } from '../../../domain/entities/template.entity';
import { TemplateUpdatedEvent } from '../../../domain/events/template.events';

@CommandHandler(UpdateTemplateCommand)
export class UpdateTemplateHandler
  extends BaseCommandHandler<UpdateTemplateCommand, TemplateResponseDTO>
  implements ICommandHandler<UpdateTemplateCommand>
{
  readonly commandType = 'template.update';

  constructor(
    private readonly templateRepo: TemplateRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: UpdateTemplateCommand): Promise<TemplateResponseDTO> {
    const idVO = TemplateIdVO.create(command.templateId);
    const entity = await this.templateRepo.findById(idVO);
    if (!entity) {
      throw new Error(`Template not found: ${command.templateId}`);
    }

    const updated = TemplateEntity.reconstitute(
      entity.id,
      {
        name: entity.name,
        channel: entity.channel,
        language: entity.language,
        subject: command.subject ?? entity.subject,
        content: command.body
          ? TemplateContentVO.create(command.body)
          : entity.content,
        format: entity.format,
        variables: entity.variables,
      },
      entity.createdAt,
      new Date().toISOString(),
      entity.deletedAt ?? null,
    );

    const saved = await this.templateRepo.save(updated);

    // ✅ FIXED: 3 args (aggregateId, templateId, version)
    await this.eventBus.publish(
      new TemplateUpdatedEvent(saved.id.value, saved.id, 0),
    );

    return {
      id: saved.id.value,
      name: saved.name.value,
      slug: saved.name.value.toLowerCase().replace(/\s+/g, '-'),
      type: 'transactional',
      status: 'active',
      category: 'system',
      locale: saved.language,
      subject: saved.subject ?? undefined,
      body: saved.content.value,
      bodyHtml: undefined,
      variables: saved.variables.map((v) => ({
        name: v,
        type: 'string',
        required: true,
      })),
      version: 1,
      createdBy: 'system',
      createdAt: saved.createdAt,
      updatedAt: saved.updatedAt,
    } as TemplateResponseDTO;
  }
}
