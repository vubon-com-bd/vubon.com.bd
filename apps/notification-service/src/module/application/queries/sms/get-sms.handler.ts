import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetSmsQuery } from './get-sms.query.js';
import { SMS_SERVICE, type ISmsService } from '../../services/interfaces/sms.service.interface.js';
import type { SmsResponseDTO } from '../../dtos/responses/channel-response.dto.js';

@QueryHandler(GetSmsQuery)
export class GetSmsHandler implements IQueryHandler<GetSmsQuery, SmsResponseDTO> {
  constructor(@Inject(SMS_SERVICE) private readonly service: ISmsService) {}

  async execute(q: GetSmsQuery): Promise<SmsResponseDTO> {
    return this.service.getById({ smsId: q.smsId });
  }
}
