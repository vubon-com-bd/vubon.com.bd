import type { SupportTemplateEntity } from '../../../domain/entities/support-template.entity';
import type { TemplateIdVO } from '../../../domain/value-objects/primitives/template-id.vo';
import type { CreateTemplateRequestDTO } from '../../dtos/requests/template';

export interface TemplateServiceInterface {
  create(input: CreateTemplateRequestDTO): Promise<{ id: string }>;
  findById(id: TemplateIdVO): Promise<SupportTemplateEntity | null>;
}
