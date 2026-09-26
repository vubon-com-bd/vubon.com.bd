import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { PromptTemplateEntity } from '../../../domain/entities/prompt-template.entity';
import type { PromptIdVO } from '../../../domain/value-objects/primitives/prompt-id.vo';
import type { CreateTemplateRequestDTO } from '../../dtos/requests/prompt/create-template.dto';

export interface PromptTemplateServiceInterface
  extends BaseServiceInterface<PromptTemplateEntity, PromptIdVO> {
  create(input: CreateTemplateRequestDTO): Promise<PromptTemplateEntity>;
  findByPromptId(promptId: string): Promise<PromptTemplateEntity | null>;
}
