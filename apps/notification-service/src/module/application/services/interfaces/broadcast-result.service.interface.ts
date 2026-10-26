/**
 * IBroadcastResultService — contract
 * @module notification-service/application/services/interfaces
 */
import type { BroadcastResultResponseDTO } from '@application/dtos/responses/broadcast-response.dto.js';

export const BROADCAST_RESULT_SERVICE = Symbol('BROADCAST_RESULT_SERVICE');

export interface IBroadcastResultService {
  getByBroadcast(broadcastId: string): Promise<BroadcastResultResponseDTO | null>;
  listHighFailure(threshold: number): Promise<readonly BroadcastResultResponseDTO[]>;
  listRecent(limit: number): Promise<readonly BroadcastResultResponseDTO[]>;
  getAverageDeliveryRate(fromDate?: string, toDate?: string): Promise<number>;
  getAverageOpenRate(fromDate?: string, toDate?: string): Promise<number>;
}
