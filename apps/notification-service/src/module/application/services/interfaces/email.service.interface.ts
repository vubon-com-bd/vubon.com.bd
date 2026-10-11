/**
 * IEmailService — contract
 * @module notification-service/application/services/interfaces
 */
import type {
  SendEmailRequestDTO,
  SendEmailWithTemplateRequestDTO,
  GetEmailRequestDTO,
  ListEmailsRequestDTO,
} from '../../dtos/requests/email/index.js';
import type {
  EmailResponseDTO,
  EmailSendResponseDTO,
  EmailListResponseDTO,
} from '../../dtos/responses/channel-response.dto.js';

export const EMAIL_SERVICE = Symbol('EMAIL_SERVICE');

export interface IEmailService {
  send(dto: SendEmailRequestDTO, actorId?: string): Promise<EmailSendResponseDTO>;
  sendWithTemplate(
    dto: SendEmailWithTemplateRequestDTO,
    actorId?: string,
  ): Promise<EmailSendResponseDTO>;
  getById(dto: GetEmailRequestDTO): Promise<EmailResponseDTO>;
  list(dto: ListEmailsRequestDTO): Promise<EmailListResponseDTO>;
  retry(emailId: string, actorId?: string): Promise<EmailSendResponseDTO>;
  cancel(emailId: string, actorId?: string): Promise<EmailResponseDTO>;
}
