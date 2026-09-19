import { httpClient } from '../../common/client/client.factory';
import { generateIdempotencyKey } from '../../common/idempotency/idempotency-key';
import { ADDRESS_ENDPOINTS } from './address.endpoints';
import type {
  Address,
  AddressListResponse,
  CreateAddressRequest,
  UpdateAddressRequest,
} from './address.types';

export const addressApi = {
  list: async (signal?: AbortSignal): Promise<AddressListResponse> => {
    const res = await httpClient.get<AddressListResponse>(ADDRESS_ENDPOINTS.list, {
      signal,
      timeout: 10_000,
    });
    return res.data;
  },

  create: async (input: CreateAddressRequest, signal?: AbortSignal): Promise<Address> => {
    const res = await httpClient.post<Address>(ADDRESS_ENDPOINTS.create, input, {
      signal,
      timeout: 10_000,
      headers: { 'Idempotency-Key': generateIdempotencyKey() },
    });
    return res.data;
  },

  update: async (
    id: string,
    input: UpdateAddressRequest,
    signal?: AbortSignal
  ): Promise<Address> => {
    const res = await httpClient.patch<Address>(ADDRESS_ENDPOINTS.update(id), input, {
      signal,
      timeout: 10_000,
    });
    return res.data;
  },

  remove: async (id: string, signal?: AbortSignal): Promise<void> => {
    await httpClient.delete<null>(ADDRESS_ENDPOINTS.remove(id), {
      signal,
      timeout: 10_000,
    });
  },
} as const;
