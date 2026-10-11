/**
 * EmailControllerMapper
 * @module notification-service/interfaces/mappers
 */
import type {
  SendEmailHttpDTO,
  SendEmailWithTemplateHttpDTO,
  ListEmailsHttpQueryDTO,
} from '../dtos/requests/email/email.http-dto.js';
import type {
  SendEmailRequestDTO,
  SendEmailWithTemplateRequestDTO,
  ListEmailsRequestDTO,
} from '../../application/dtos/requests/email/email.dto.js';

export class EmailControllerMapper {
  static toSendAppDto(dto: SendEmailHttpDTO): SendEmailRequestDTO {
    return {
      to: dto.to,
      cc: dto.cc,
      bcc: dto.bcc,
      from: dto.from,
      replyTo: dto.replyTo,
      subject: dto.subject,
      text: dto.text,
      html: dto.html,
      templateId: dto.templateId,
      templateData: dto.templateData,
      attachments: dto.attachments,
      headers: dto.headers,
      priority: dto.priority as never,
      idempotencyKey: dto.idempotencyKey,
    };
  }

  static toSendWithTemplateAppDto(
    dto: SendEmailWithTemplateHttpDTO,
  ): SendEmailWithTemplateRequestDTO {
    return {
      to: dto.to,
      templateSlug: dto.templateSlug,
      templateData: dto.templateData,
      locale: dto.locale,
      priority: dto.priority as never,
    };
  }

  static toListAppDto(q: ListEmailsHttpQueryDTO): ListEmailsRequestDTO {
    return {
      page: q.page ?? 1,
      limit: q.limit ?? 20,
      filter: {
        to: q.to,
        status: q.status,
        provider: q.provider,
        fromDate: q.fromDate,
        toDate: q.toDate,
      },
    };
  }
}
