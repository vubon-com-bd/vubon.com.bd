import { httpClient } from '../../common/client/client.factory';
import { BIOMETRIC_ENDPOINTS } from './biometric.endpoints';
import type {
  BiometricRegisterRequest,
  BiometricRegisterResponse,
  BiometricVerifyRequest,
  BiometricVerifyResponse,
} from './biometric.types';

export const biometricApi = {
  register: async (
    input: BiometricRegisterRequest,
    signal?: AbortSignal
  ): Promise<BiometricRegisterResponse> => {
    const res = await httpClient.post<BiometricRegisterResponse>(
      BIOMETRIC_ENDPOINTS.register,
      input,
      { signal, timeout: 10_000 }
    );
    return res.data;
  },

  verify: async (
    input: BiometricVerifyRequest,
    signal?: AbortSignal
  ): Promise<BiometricVerifyResponse> => {
    const res = await httpClient.post<BiometricVerifyResponse>(BIOMETRIC_ENDPOINTS.verify, input, {
      signal,
      timeout: 10_000,
    });
    return res.data;
  },
} as const;
