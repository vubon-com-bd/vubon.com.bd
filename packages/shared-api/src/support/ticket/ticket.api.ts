import { httpClient } from '../../common/client/client.factory';
import { generateIdempotencyKey } from '../../common/idempotency/idempotency-key';
import type { QueryParams } from '../../common/request/request.types';
import { TICKET_ENDPOINTS } from './ticket.endpoints';
import type {
  CreateTicketRequest,
  Ticket,
  TicketListResponse,
  UpdateTicketRequest,
} from './ticket.types';

export const ticketApi = {
  list: async (query?: QueryParams, signal?: AbortSignal): Promise<TicketListResponse> => {
    const res = await httpClient.get<TicketListResponse>(TICKET_ENDPOINTS.list, {
      signal,
      timeout: 15_000,
      query,
    });
    return res.data;
  },

  detail: async (id: string, signal?: AbortSignal): Promise<Ticket> => {
    const res = await httpClient.get<Ticket>(TICKET_ENDPOINTS.detail(id), {
      signal,
      timeout: 10_000,
    });
    return res.data;
  },

  create: async (input: CreateTicketRequest, signal?: AbortSignal): Promise<Ticket> => {
    const res = await httpClient.post<Ticket>(TICKET_ENDPOINTS.create, input, {
      signal,
      timeout: 15_000,
      headers: { 'Idempotency-Key': generateIdempotencyKey() },
    });
    return res.data;
  },

  update: async (id: string, input: UpdateTicketRequest, signal?: AbortSignal): Promise<Ticket> => {
    const res = await httpClient.patch<Ticket>(TICKET_ENDPOINTS.update(id), input, {
      signal,
      timeout: 10_000,
    });
    return res.data;
  },

  close: async (id: string, reason?: string, signal?: AbortSignal): Promise<Ticket> => {
    const res = await httpClient.patch<Ticket>(
      TICKET_ENDPOINTS.close(id),
      { reason },
      { signal, timeout: 10_000 }
    );
    return res.data;
  },
} as const;
