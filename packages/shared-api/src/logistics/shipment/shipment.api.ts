import { httpClient } from '../../common/client/client.factory';
import { generateIdempotencyKey } from '../../common/idempotency/idempotency-key';
import type { QueryParams } from '../../common/request/request.types';
import { SHIPMENT_ENDPOINTS } from './shipment.endpoints';
import type { CreateShipmentRequest, Shipment, ShipmentListResponse } from './shipment.types';

export const shipmentApi = {
  list: async (query?: QueryParams, signal?: AbortSignal): Promise<ShipmentListResponse> => {
    const res = await httpClient.get<ShipmentListResponse>(SHIPMENT_ENDPOINTS.list, {
      signal,
      timeout: 15_000,
      query,
    });
    return res.data;
  },

  detail: async (id: string, signal?: AbortSignal): Promise<Shipment> => {
    const res = await httpClient.get<Shipment>(SHIPMENT_ENDPOINTS.detail(id), {
      signal,
      timeout: 10_000,
    });
    return res.data;
  },

  create: async (input: CreateShipmentRequest, signal?: AbortSignal): Promise<Shipment> => {
    const res = await httpClient.post<Shipment>(SHIPMENT_ENDPOINTS.create, input, {
      signal,
      timeout: 20_000,
      headers: { 'Idempotency-Key': generateIdempotencyKey() },
    });
    return res.data;
  },
} as const;
