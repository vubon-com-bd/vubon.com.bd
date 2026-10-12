/**
 * Session Response DTO
 * @module analytics-service/application/dtos/responses
 */
import { BaseResponseDTO } from '@vubon/shared-kernel/application/dtos';

export interface SessionResponseData {
  readonly id: string;
  readonly userId?: string;
  readonly device?: string;
  readonly startedAt: string;
  readonly endedAt?: string;
  readonly durationSeconds: number;
  readonly eventCount: number;
  readonly pageViewCount: number;
  readonly isBounce: boolean;
  readonly isEngaged: boolean;
  readonly isAnonymous: boolean;
}

export class SessionResponseDTO extends BaseResponseDTO<SessionResponseData> {
  static of(data: SessionResponseData, message?: string): SessionResponseDTO {
    return BaseResponseDTO.ok(data, message) as SessionResponseDTO;
  }
}
