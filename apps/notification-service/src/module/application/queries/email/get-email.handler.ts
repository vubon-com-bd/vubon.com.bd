import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetEmailQuery } from './get-email.query.js';
import { EMAIL_SERVICE, type IEmailService } from '../../services/interfaces/email.service.interface.js';
import type { EmailResponseDTO } from '../../dtos/responses/channel-response.dto.js';

@QueryHandler(GetEmailQuery)
export class GetEmailHandler implements IQueryHandler<GetEmailQuery, EmailResponseDTO> {
  constructor(@Inject(EMAIL_SERVICE) private readonly service: IEmailService) {}

  async execute(q: GetEmailQuery): Promise<EmailResponseDTO> {
    return this.service.getById({ emailId: q.emailId });
  }
}
