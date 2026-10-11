/**
 * IBroadcastService — contract
 * @module notification-service/application/services/interfaces
 */
import type {
  CreateBroadcastRequestDTO,
  UpdateBroadcastRequestDTO,
  GetBroadcastRequestDTO,
  ListBroadcastsRequestDTO,
  ScheduleBroadcastRequestDTO,
  StartBroadcastRequestDTO,
  CancelBroadcastRequestDTO,
  BroadcastStatsRequestDTO,
  TestBroadcastRequestDTO,
} from '../../dtos/requests/broadcast/index.js';
import type {
  BroadcastResponseDTO,
  BroadcastListResponseDTO,
  BroadcastStatsResponseDTO,
  BroadcastProgressResponseDTO,
} from '../../dtos/responses/broadcast-response.dto.js';

export const BROADCAST_SERVICE = Symbol('BROADCAST_SERVICE');

export interface IBroadcastService {
  create(dto: CreateBroadcastRequestDTO, actorId?: string): Promise<BroadcastResponseDTO>;
  update(dto: UpdateBroadcastRequestDTO, actorId?: string): Promise<BroadcastResponseDTO>;
  schedule(dto: ScheduleBroadcastRequestDTO, actorId?: string): Promise<BroadcastResponseDTO>;
  start(dto: StartBroadcastRequestDTO, actorId?: string): Promise<BroadcastResponseDTO>;
  cancel(dto: CancelBroadcastRequestDTO, actorId?: string): Promise<BroadcastResponseDTO>;
  test(dto: TestBroadcastRequestDTO, actorId?: string): Promise<BroadcastResponseDTO>;
  getById(dto: GetBroadcastRequestDTO): Promise<BroadcastResponseDTO>;
  getStats(dto: BroadcastStatsRequestDTO): Promise<BroadcastStatsResponseDTO>;
  getProgress(broadcastId: string): Promise<BroadcastProgressResponseDTO>;
  list(dto: ListBroadcastsRequestDTO): Promise<BroadcastListResponseDTO>;
}
