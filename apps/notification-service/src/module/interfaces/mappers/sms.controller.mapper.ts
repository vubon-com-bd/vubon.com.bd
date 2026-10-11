/**
 * SmsControllerMapper
 * @module notification-service/interfaces/mappers
 */
import type {
  SendSmsHttpDTO,
  SendBulkSmsHttpDTO,
  ListSmsHttpQueryDTO,
} from '../dtos/requests/sms/sms.http-dto.js';
import type {
  SendSmsRequestDTO,
  SendBulkSmsRequestDTO,
  ListSmsRequestDTO,
} from '../../application/dtos/requests/sms/sms.dto.js';

export class SmsControllerMapper {
  static toSendAppDto(dto: SendSmsHttpDTO): SendSmsRequestDTO {
    return {
      to: dto.to,
      message: dto.message,
      type: dto.type as never,
      senderId: dto.senderId,
      provider: dto.provider as never,
      templateId: dto.templateId,
      templateData: dto.templateData,
      idempotencyKey: dto.idempotencyKey,
    };
  }

  static toBulkAppDto(dto: SendBulkSmsHttpDTO): SendBulkSmsRequestDTO {
    return {
      recipients: dto.recipients,
      message: dto.message,
      type: dto.type as never,
      senderId: dto.senderId,
      provider: dto.provider as never,
    };
  }

  static toListAppDto(q: ListSmsHttpQueryDTO): ListSmsRequestDTO {
    return {
      page: q.page ?? 1,
      limit: q.limit ?? 20,
      filter: {
        to: q.to,
        status: q.status,
        provider: q.provider,
        type: q.type,
        fromDate: q.fromDate,
        toDate: q.toDate,
      },
    };
  }
}
