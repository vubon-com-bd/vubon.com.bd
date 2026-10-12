/**
 * Session Service Interface
 * @module analytics-service/application/services/interfaces
 */
import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services';
import type { SessionEntity } from '../../../domain/entities/session.entity.js';
import type { SessionResponseData } from '../../dtos/responses/session-response.dto.js';

export interface ISessionService extends BaseServiceInterface<SessionEntity, string> {
  findById(id: string): Promise<SessionResponseData | null>;
  findByUser(userId: string): Promise<readonly SessionResponseData[]>;
  end(id: string): Promise<SessionResponseData>;
  buildFromEvents(eventIds: readonly string[]): Promise<SessionResponseData>;
}
