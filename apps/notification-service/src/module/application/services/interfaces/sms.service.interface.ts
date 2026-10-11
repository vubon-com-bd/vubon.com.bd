/**
 * ISmsService — contract
 * @module notification-service/application/services/interfaces
 */
import type {
  SendSmsRequestDTO,
  SendBulkSmsRequestDTO,
  GetSmsRequestDTO,
  ListSmsRequestDTO,
} from '../../dtos/requests/sms/index.js';
import type {
  SmsResponseDTO,
  SmsSendResponseDTO,
  SmsListResponseDTO,
} from '../../dtos/responses/channel-response.dto.js';

export const SMS_SERVICE = Symbol('SMS_SERVICE');

export interface ISmsService {
  send(dto: SendSmsRequestDTO, actorId?: string): Promise<SmsSendResponseDTO>;
  sendBulk(
    dto: SendBulkSmsRequestDTO,
    actorId?: string,
  ): Promise<readonly SmsSendResponseDTO[]>;
  getById(dto: GetSmsRequestDTO): Promise<SmsResponseDTO>;
  list(dto: ListSmsRequestDTO): Promise<SmsListResponseDTO>;
  retry(smsId: string, actorId?: string): Promise<SmsSendResponseDTO>;
  cancel(smsId: string, actorId?: string): Promise<SmsResponseDTO>;
}
