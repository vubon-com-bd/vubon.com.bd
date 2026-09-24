import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { CreateTemplateCommand } from './create-template.command';
import type { TemplateResponseDTO } from '../../dtos/responses/template-response.dto';
import type { TemplateRepository } from '../../../domain/repositories/template.repository.interface';
import { TemplateEntity } from '../../../domain/entities/template.entity';
import { TemplateNameVO } from '../../../domain/value-objects/primitives/template-name.vo';
import { TemplateContentVO } from '../../../domain/value-objects/primitives/template-content.vo';
import { TemplateFormatVO } from '../../../domain/value-objects/primitives/template-format.vo';
import { NotificationChannelVO } from '../../../domain/value-objects/primitives/notification-channel.vo';
import { TemplateCreatedEvent } from '../../../domain/events/template.events';

@CommandHandler(CreateTemplateCommand)
export class CreateTemplateHandler
  extends BaseCommandHandler<CreateTemplateCommand, TemplateResponseDTO>
  implements ICommandHandler<CreateTemplateCommand>
{
  readonly commandType = 'template.create';

  constructor(
    private readonly templateRepo: TemplateRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: CreateTemplateCommand): Promise<TemplateResponseDTO> {
    const existing = await this.templateRepo.findByName(
      TemplateNameVO.create(command.name),
    );
    if (existing) {
      throw new Error(`Template already exists: ${command.name}`);
    }

    const entity = TemplateEntity.create({
      name: TemplateNameVO.create(command.name),
      channel: NotificationChannelVO.create('email'),
      language: command.locale ?? 'en',
      subject: command.subject ?? null,
      content: TemplateContentVO.create(command.body),
      format: TemplateFormatVO.create('html'),
      variables: (command.variables ?? []).map((v) => v.name),
    });

    const saved = await this.templateRepo.save(entity);

    // ✅ FIXED: 4 args (aggregateId, templateId, name, version)
    await this.eventBus.publish(
      new TemplateCreatedEvent(saved.id.value, saved.id, saved.name.value, 0),
    );

    return {
      id: saved.id.value,
      name: saved.name.value,
      slug: command.slug,
      type: command.templateType,
      status: 'active',
      category: command.category,
      locale: saved.language,
      subject: saved.subject ?? undefined,
      body: saved.content.value,
      bodyHtml: undefined,
      variables: (command.variables ?? []).map((v) => ({
        name: v.name,
        type: 'string',
        required: v.required,
        defaultValue: v.defaultValue,
        description: undefined,
      })),
      version: 1,
      parentId: undefined,
      createdBy: 'system',
      updatedBy: undefined,
      createdAt: saved.createdAt,
      updatedAt: saved.updatedAt,
    } as TemplateResponseDTO;
  }
}
