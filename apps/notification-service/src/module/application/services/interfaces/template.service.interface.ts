import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { TemplateEntity } from '../../../domain/entities/template.entity';
import type { TemplateResponseDTO } from '../../dtos/responses/template-response.dto';

export interface TemplateServiceInterface
  extends BaseServiceInterface<TemplateEntity, string> {
  findById(id: string): Promise<TemplateResponseDTO | null>;
  findByName(name: string): Promise<TemplateResponseDTO | null>;
  findByChannel(channel: string): Promise<readonly TemplateResponseDTO[]>;
}
