import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListSmsQuery } from './list-sms.query.js';
import { SMS_SERVICE, type ISmsService } from '../../services/interfaces/sms.service.interface.js';
import type { SmsListResponseDTO } from '../../dtos/responses/channel-response.dto.js';

@QueryHandler(ListSmsQuery)
export class ListSmsHandler implements IQueryHandler<ListSmsQuery, SmsListResponseDTO> {
  constructor(@Inject(SMS_SERVICE) private readonly service: ISmsService) {}

  async execute(q: ListSmsQuery): Promise<SmsListResponseDTO> {
    return this.service.list(q.options);
  }
}
