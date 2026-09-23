import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { EmailTemplateServiceInterface } from '../interfaces/email-template.service.interface';
import type { EmailTemplateRepository } from '../../../domain/repositories/email-template.repository.interface';
import { EmailTemplateEntity } from '../../../domain/entities/email-template.entity';
import type { CreateEmailTemplateRequestDTO } from '../../dtos/requests/email-marketing/create-email-template.dto';
import type { EmailTemplateResponseDTO } from '../../dtos/responses/email-template-response.dto';

@Injectable()
export class EmailTemplateService
  extends BaseService<EmailTemplateEntity, string>
  implements EmailTemplateServiceInterface
{
  readonly name = 'EmailTemplateService';

  constructor(private readonly repo: EmailTemplateRepository) {
    super();
  }

  async create(input: CreateEmailTemplateRequestDTO): Promise<EmailTemplateResponseDTO> {
    const entity = EmailTemplateEntity.create({
      name: input.name,
      subject: input.subject,
      html: input.html,
      language: input.language ?? 'en',
      variables: input.variables ?? [],
    });
    await this.repo.save(entity);
    return this.toDTO(entity);
  }

  async findByName(name: string): Promise<EmailTemplateResponseDTO | null> {
    const entity = await this.repo.findByName(name);
    return entity ? this.toDTO(entity) : null;
  }

  private toDTO(entity: EmailTemplateEntity): EmailTemplateResponseDTO {
    return {
      id: entity.id,
      name: entity.name,
      subject: entity.subject,
      html: entity.html,
      language: entity.language,
      variables: [...entity.variables],
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt ?? null,
    } as unknown as EmailTemplateResponseDTO;
  }
}
