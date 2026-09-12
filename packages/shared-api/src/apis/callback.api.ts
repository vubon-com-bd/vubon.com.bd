import { ApiClient } from '../client/api-client';
import { CALLBACK_ENDPOINTS } from '../endpoints/callback.endpoints';

export const callbackApi = {
  status: (callbackId: string): Promise<unknown> =>
    ApiClient.get(CALLBACK_ENDPOINTS.STATUS(callbackId)),
  retry: (callbackId: string): Promise<void> =>
    ApiClient.post(CALLBACK_ENDPOINTS.RETRY(callbackId)),
  cancel: (callbackId: string): Promise<void> =>
    ApiClient.post(CALLBACK_ENDPOINTS.CANCEL(callbackId)),
} as const;
