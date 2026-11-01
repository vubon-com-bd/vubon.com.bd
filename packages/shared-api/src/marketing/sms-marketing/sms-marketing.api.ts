import { httpClient } from '../../common/client/client.factory';
import { generateIdempotencyKey } from '../../common/idempotency/idempotency-key';
import type { QueryParams } from '../../common/request/request.types';
import { SMS_MARKETING_ENDPOINTS } from './sms-marketing.endpoints';
import type { SendSmsMarketingRequest, SmsMarketingListResponse } from './sms-marketing.types';

export const smsMarketingApi = {
  list: async (query?: QueryParams, signal?: AbortSignal): Promise<SmsMarketingListResponse> => {
    const res = await httpClient.get<SmsMarketingListResponse>(SMS_MARKETING_ENDPOINTS.list, {
      signal,
      timeout: 15_000,
      query,
    });
    return res.data;
  },

  send: async (
    input: SendSmsMarketingRequest,
    signal?: AbortSignal
  ): Promise<{ readonly accepted: boolean; readonly jobId: string }> => {
    const res = await httpClient.post<{
      readonly accepted: boolean;
      readonly jobId: string;
    }>(SMS_MARKETING_ENDPOINTS.send, input, {
      signal,
      timeout: 30_000,
      headers: { 'Idempotency-Key': generateIdempotencyKey() },
    });
    return res.data;
  },
} as const;
