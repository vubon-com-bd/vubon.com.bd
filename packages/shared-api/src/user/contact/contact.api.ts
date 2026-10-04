import { httpClient } from '../../common/client/client.factory';
import { CONTACT_ENDPOINTS } from './contact.endpoints';
import type { ContactListResponse, CreateContactRequest, UserContact } from './contact.types';

export const contactApi = {
  list: async (signal?: AbortSignal): Promise<ContactListResponse> => {
    const res = await httpClient.get<ContactListResponse>(CONTACT_ENDPOINTS.list, {
      signal,
      timeout: 10_000,
    });
    return res.data;
  },

  create: async (input: CreateContactRequest, signal?: AbortSignal): Promise<UserContact> => {
    const res = await httpClient.post<UserContact>(CONTACT_ENDPOINTS.create, input, {
      signal,
      timeout: 10_000,
    });
    return res.data;
  },

  remove: async (id: string, signal?: AbortSignal): Promise<void> => {
    await httpClient.delete<null>(CONTACT_ENDPOINTS.remove(id), {
      signal,
      timeout: 10_000,
    });
  },
} as const;
