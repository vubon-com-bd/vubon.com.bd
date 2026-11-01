import { httpClient } from '../../../common/client/client.factory';
import { generateIdempotencyKey } from '../../../common/idempotency/idempotency-key';
import type { QueryParams } from '../../../common/request/request.types';
import { VENDOR_ENDPOINTS } from './vendor.endpoints';
import type {
  CreateVendorRequest,
  UpdateVendorRequest,
  Vendor,
  VendorListResponse,
} from './vendor.types';

export const vendorApi = {
  list: async (query?: QueryParams, signal?: AbortSignal): Promise<VendorListResponse> => {
    const res = await httpClient.get<VendorListResponse>(VENDOR_ENDPOINTS.list, {
      signal,
      timeout: 15_000,
      query,
    });
    return res.data;
  },

  detail: async (id: string, signal?: AbortSignal): Promise<Vendor> => {
    const res = await httpClient.get<Vendor>(VENDOR_ENDPOINTS.detail(id), {
      signal,
      timeout: 10_000,
    });
    return res.data;
  },

  create: async (input: CreateVendorRequest, signal?: AbortSignal): Promise<Vendor> => {
    const res = await httpClient.post<Vendor>(VENDOR_ENDPOINTS.create, input, {
      signal,
      timeout: 20_000,
      headers: { 'Idempotency-Key': generateIdempotencyKey() },
    });
    return res.data;
  },

  update: async (id: string, input: UpdateVendorRequest, signal?: AbortSignal): Promise<Vendor> => {
    const res = await httpClient.patch<Vendor>(VENDOR_ENDPOINTS.update(id), input, {
      signal,
      timeout: 15_000,
    });
    return res.data;
  },
} as const;
