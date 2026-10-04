import { httpClient } from '../../../common/client/client.factory';
import { generateIdempotencyKey } from '../../../common/idempotency/idempotency-key';
import { SMS_ENDPOINTS } from './sms.endpoints';
import type { SendSmsRequest, SendSmsResponse } from './sms.types';

export const smsApi = {
  send: async (input: SendSmsRequest, signal?: AbortSignal): Promise<SendSmsResponse> => {
    const res = await httpClient.post<SendSmsResponse>(SMS_ENDPOINTS.send, input, {
      signal,
      timeout: 15_000,
      headers: { 'Idempotency-Key': generateIdempotencyKey() },
    });
    return res.data;
  },
} as const;
