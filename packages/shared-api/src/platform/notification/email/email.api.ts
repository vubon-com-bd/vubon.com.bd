import { httpClient } from '../../../common/client/client.factory';
import { generateIdempotencyKey } from '../../../common/idempotency/idempotency-key';
import { EMAIL_ENDPOINTS } from './email.endpoints';
import type { EmailTemplate, SendEmailRequest, SendEmailResponse } from './email.types';

export const emailApi = {
  send: async (input: SendEmailRequest, signal?: AbortSignal): Promise<SendEmailResponse> => {
    const res = await httpClient.post<SendEmailResponse>(EMAIL_ENDPOINTS.send, input, {
      signal,
      timeout: 15_000,
      headers: { 'Idempotency-Key': generateIdempotencyKey() },
    });
    return res.data;
  },

  templates: async (signal?: AbortSignal): Promise<readonly EmailTemplate[]> => {
    const res = await httpClient.get<readonly EmailTemplate[]>(EMAIL_ENDPOINTS.templates, {
      signal,
      timeout: 10_000,
    });
    return res.data;
  },
} as const;
