import { httpClient } from '../../common/client/client.factory';
import { generateIdempotencyKey } from '../../common/idempotency/idempotency-key';
import type { QueryParams } from '../../common/request/request.types';
import { FEEDBACK_ENDPOINTS } from './feedback.endpoints';
import type { Feedback, FeedbackListResponse, SubmitFeedbackRequest } from './feedback.types';

export const feedbackApi = {
  list: async (query?: QueryParams, signal?: AbortSignal): Promise<FeedbackListResponse> => {
    const res = await httpClient.get<FeedbackListResponse>(FEEDBACK_ENDPOINTS.list, {
      signal,
      timeout: 15_000,
      query,
    });
    return res.data;
  },

  submit: async (input: SubmitFeedbackRequest, signal?: AbortSignal): Promise<Feedback> => {
    const res = await httpClient.post<Feedback>(FEEDBACK_ENDPOINTS.submit, input, {
      signal,
      timeout: 15_000,
      headers: { 'Idempotency-Key': generateIdempotencyKey() },
    });
    return res.data;
  },
} as const;
