import { httpClient } from '../../common/client/client.factory';
import type { QueryParams } from '../../common/request/request.types';
import { VEHICLE_ENDPOINTS } from './vehicle.endpoints';
import type { Vehicle, VehicleListResponse } from './vehicle.types';

export const vehicleApi = {
  list: async (query?: QueryParams, signal?: AbortSignal): Promise<VehicleListResponse> => {
    const res = await httpClient.get<VehicleListResponse>(VEHICLE_ENDPOINTS.list, {
      signal,
      timeout: 15_000,
      query,
    });
    return res.data;
  },

  detail: async (id: string, signal?: AbortSignal): Promise<Vehicle> => {
    const res = await httpClient.get<Vehicle>(VEHICLE_ENDPOINTS.detail(id), {
      signal,
      timeout: 10_000,
    });
    return res.data;
  },
} as const;
