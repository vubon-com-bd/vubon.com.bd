import { httpClient } from '../../common/client/client.factory';
import { generateIdempotencyKey } from '../../common/idempotency/idempotency-key';
import type { QueryParams } from '../../common/request/request.types';
import { SURVEY_ENDPOINTS } from './survey.endpoints';
import type { SubmitSurveyRequest, SubmitSurveyResponse, SurveyListResponse } from './survey.types';

export const surveyApi = {
  list: async (query?: QueryParams, signal?: AbortSignal): Promise<SurveyListResponse> => {
    const res = await httpClient.get<SurveyListResponse>(SURVEY_ENDPOINTS.list, {
      signal,
      timeout: 15_000,
      query,
    });
    return res.data;
  },

  submit: async (
    id: string,
    input: SubmitSurveyRequest,
    signal?: AbortSignal
  ): Promise<SubmitSurveyResponse> => {
    const res = await httpClient.post<SubmitSurveyResponse>(SURVEY_ENDPOINTS.submit(id), input, {
      signal,
      timeout: 15_000,
      headers: { 'Idempotency-Key': generateIdempotencyKey() },
    });
    return res.data;
  },
} as const;
