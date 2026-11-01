import { httpClient } from '../../common/client/client.factory';
import { generateIdempotencyKey } from '../../common/idempotency/idempotency-key';
import { AI_TRAINING_ENDPOINTS } from './training.endpoints';
import type { TrainingJob, TrainingStartRequest, TrainingStartResponse } from './training.types';

export const aiTrainingApi = {
  start: async (
    input: TrainingStartRequest,
    signal?: AbortSignal
  ): Promise<TrainingStartResponse> => {
    const res = await httpClient.post<TrainingStartResponse>(AI_TRAINING_ENDPOINTS.start, input, {
      signal,
      timeout: 30_000,
      headers: { 'Idempotency-Key': generateIdempotencyKey() },
    });
    return res.data;
  },

  status: async (jobId: string, signal?: AbortSignal): Promise<TrainingJob> => {
    const res = await httpClient.get<TrainingJob>(AI_TRAINING_ENDPOINTS.status(jobId), {
      signal,
      timeout: 10_000,
    });
    return res.data;
  },
} as const;
