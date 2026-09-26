import { httpClient } from '../../common/client/client.factory';
import { generateIdempotencyKey } from '../../common/idempotency/idempotency-key';
import { REGISTER_ENDPOINTS } from './register.endpoints';
import type { RegisterRequest, RegisterResponse } from './register.types';

export const registerApi = {
  /**
   * Create a new account.
   * POST requires Idempotency-Key to prevent duplicate registration.
   */
  submit: async (input: RegisterRequest, signal?: AbortSignal): Promise<RegisterResponse> => {
    const res = await httpClient.post<RegisterResponse>(REGISTER_ENDPOINTS.submit, input, {
      signal,
      timeout: 15_000,
      headers: { 'Idempotency-Key': generateIdempotencyKey() },
    });
    return res.data;
  },
} as const;
