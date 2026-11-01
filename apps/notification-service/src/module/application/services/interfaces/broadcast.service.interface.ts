/**
 * IBroadcastService — contract
 * @module notification-service/application/services/interfaces
 */
import type {
  CreateBroadcastRequestDTO,
  StartBroadcastRequestDTO,
  CancelBroadcastRequestDTO,
} from '@application/dtos/requests/broadcast/index.js';
import type {
  BroadcastResponseDTO,
  BroadcastSummaryResponseDTO,
  BroadcastListResponseDTO,
  BroadcastResultResponseDTO,
} from '@application/dtos/responses/broadcast-response.dto.js';

export const BROADCAST_SERVICE = Symbol('BROADCAST_SERVICE');

export interface BroadcastListFilterDTO {
  readonly type?: string;
  readonly status?: string;
  readonly target?: string;
  readonly createdBy?: string;
  readonly fromDate?: string;
  readonly toDate?: string;
  readonly search?: string;
}

export interface BroadcastListOptionsDTO {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'updatedAt' | 'scheduledAt' | 'recipientCount';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: BroadcastListFilterDTO;
}

export interface IBroadcastService {
  // Commands
  create(
    dto: CreateBroadcastRequestDTO,
    actorId?: string,
  ): Promise<BroadcastResponseDTO>;

  start(
    dto: StartBroadcastRequestDTO,
    actorId?: string,
  ): Promise<BroadcastResponseDTO>;

  cancel(
    dto: CancelBroadcastRequestDTO,
    actorId?: string,
  ): Promise<BroadcastResponseDTO>;

  // Queries
  getById(id: string): Promise<BroadcastResponseDTO>;
  getResult(id: string): Promise<BroadcastResultResponseDTO>;
  list(options: BroadcastListOptionsDTO): Promise<BroadcastListResponseDTO>;
}
