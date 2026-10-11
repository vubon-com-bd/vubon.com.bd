import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListEmailsQuery } from './list-emails.query.js';
import { EMAIL_SERVICE, type IEmailService } from '../../services/interfaces/email.service.interface.js';
import type { EmailListResponseDTO } from '../../dtos/responses/channel-response.dto.js';

@QueryHandler(ListEmailsQuery)
export class ListEmailsHandler implements IQueryHandler<ListEmailsQuery, EmailListResponseDTO> {
  constructor(@Inject(EMAIL_SERVICE) private readonly service: IEmailService) {}

  async execute(q: ListEmailsQuery): Promise<EmailListResponseDTO> {
    return this.service.list(q.options);
  }
}
