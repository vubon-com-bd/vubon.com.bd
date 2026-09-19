import { httpClient } from '../../common/client/client.factory';
import { generateIdempotencyKey } from '../../common/idempotency/idempotency-key';
import type { QueryParams } from '../../common/request/request.types';
import { EMAIL_MARKETING_ENDPOINTS } from './email-marketing.endpoints';
import type {
  EmailMarketingListResponse,
  SendEmailMarketingRequest,
} from './email-marketing.types';

export const emailMarketingApi = {
  list: async (query?: QueryParams, signal?: AbortSignal): Promise<EmailMarketingListResponse> => {
    const res = await httpClient.get<EmailMarketingListResponse>(EMAIL_MARKETING_ENDPOINTS.list, {
      signal,
      timeout: 15_000,
      query,
    });
    return res.data;
  },

  send: async (
    input: SendEmailMarketingRequest,
    signal?: AbortSignal
  ): Promise<{ readonly accepted: boolean; readonly jobId: string }> => {
    const res = await httpClient.post<{
      readonly accepted: boolean;
      readonly jobId: string;
    }>(EMAIL_MARKETING_ENDPOINTS.send, input, {
      signal,
      timeout: 30_000,
      headers: { 'Idempotency-Key': generateIdempotencyKey() },
    });
    return res.data;
  },
} as const;
