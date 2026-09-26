import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { TemplateServiceInterface } from '../interfaces/template.service.interface';
import type { TemplateRepository } from '../../../domain/repositories/template.repository.interface';
import { TemplateEntity } from '../../../domain/entities/template.entity';
import { TemplateIdVO } from '../../../domain/value-objects/primitives/template-id.vo';
import { TemplateNameVO } from '../../../domain/value-objects/primitives/template-name.vo';
import { NotificationChannelVO } from '../../../domain/value-objects/primitives/notification-channel.vo';
import type { TemplateResponseDTO } from '../../dtos/responses/template-response.dto';

@Injectable()
export class TemplateService
  extends BaseService<TemplateEntity, string>
  implements TemplateServiceInterface
{
  readonly name = 'TemplateService';

  constructor(private readonly repo: TemplateRepository) {
    super();
  }

  async findById(id: string): Promise<TemplateResponseDTO | null> {
    const entity = await this.repo.findById(TemplateIdVO.create(id));
    return entity ? this.toDTO(entity) : null;
  }

  async findByName(name: string): Promise<TemplateResponseDTO | null> {
    const entity = await this.repo.findByName(TemplateNameVO.create(name));
    return entity ? this.toDTO(entity) : null;
  }

  async findByChannel(channel: string): Promise<readonly TemplateResponseDTO[]> {
    const entities = await this.repo.findByChannel(NotificationChannelVO.create(channel));
    return entities.map((e) => this.toDTO(e));
  }

  private toDTO(entity: TemplateEntity): TemplateResponseDTO {
    return {
      id: entity.id.value,
      name: entity.name.value,
      slug: entity.name.value.toLowerCase().replace(/\s+/g, '-'),
      type: 'transactional',
      status: 'active',
      category: 'system',
      locale: entity.language,
      subject: entity.subject ?? undefined,
      body: entity.content.value,
      bodyHtml: undefined,
      variables: entity.variables.map((v) => ({
        name: v,
        type: 'string',
        required: true,
      })),
      version: 1,
      createdBy: 'system',
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    } as TemplateResponseDTO;
  }
}
