import { ApiClient } from '../client/api-client';
import { GATEWAY_ENDPOINTS } from '../endpoints/gateway.endpoints';

export const gatewayApi = {
  list: (): Promise<unknown> => ApiClient.get(GATEWAY_ENDPOINTS.LIST),
  process: (gatewayId: string, data: unknown): Promise<unknown> =>
    ApiClient.post(GATEWAY_ENDPOINTS.PROCESS(gatewayId), data),
  verify: (gatewayId: string, data: unknown): Promise<unknown> =>
    ApiClient.post(GATEWAY_ENDPOINTS.VERIFY(gatewayId), data),
} as const;
