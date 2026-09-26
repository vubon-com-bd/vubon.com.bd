import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { EmailTemplateEntity } from '../../../domain/entities/email-template.entity';
import type { CreateEmailTemplateRequestDTO } from '../../dtos/requests/email-marketing/create-email-template.dto';
import type { EmailTemplateResponseDTO } from '../../dtos/responses/email-template-response.dto';

export interface EmailTemplateServiceInterface
  extends BaseServiceInterface<EmailTemplateEntity, string> {
  create(input: CreateEmailTemplateRequestDTO): Promise<EmailTemplateResponseDTO>;
  findByName(name: string): Promise<EmailTemplateResponseDTO | null>;
}
