import { Injectable } from '@nestjs/common';
import type { TemplateServiceInterface } from '../interfaces/template.service.interface';
import type { SupportTemplateRepository } from '../../../domain/repositories/support-template.repository.interface';
import { SupportTemplateEntity } from '../../../domain/entities/support-template.entity';
import { TemplateIdVO } from '../../../domain/value-objects/primitives/template-id.vo';
import { TemplateTypeVO } from '../../../domain/value-objects/primitives/template-type.vo';
import { TemplateContentVO } from '../../../domain/value-objects/primitives/template-content.vo';
import type { CreateTemplateRequestDTO } from '../../dtos/requests/template';

@Injectable()
export class TemplateService implements TemplateServiceInterface {
  constructor(private readonly templateRepo: SupportTemplateRepository) {}

  async create(input: CreateTemplateRequestDTO): Promise<{ id: string }> {
    const entity = SupportTemplateEntity.create({
      name: input.name,
      type: TemplateTypeVO.create(input.type),
      content: TemplateContentVO.create(input.content),
      variables: input.variables ?? [],
      isActive: true,
    });
    const saved = await this.templateRepo.save(entity);
    return { id: saved.id.value };
  }

  async findById(id: TemplateIdVO): Promise<SupportTemplateEntity | null> {
    return this.templateRepo.findById(id);
  }
}
