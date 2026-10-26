/**
 * IDigestService — contract
 * @module notification-service/application/services/interfaces
 */
import type {
  CreateDigestRequestDTO,
  SendDigestRequestDTO,
} from '@application/dtos/requests/digest/index.js';
import type {
  DigestResponseDTO,
  DigestSummaryResponseDTO,
  DigestListResponseDTO,
} from '@application/dtos/responses/digest-response.dto.js';

export const DIGEST_SERVICE = Symbol('DIGEST_SERVICE');

export interface DigestListFilterDTO {
  readonly userId?: string;
  readonly status?: string;
  readonly frequency?: string;
  readonly type?: string;
  readonly fromDate?: string;
  readonly toDate?: string;
}

export interface DigestListOptionsDTO {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'updatedAt' | 'sentAt' | 'itemCount';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: DigestListFilterDTO;
}

export interface IDigestService {
  // Commands
  create(
    dto: CreateDigestRequestDTO,
    actorId?: string,
  ): Promise<DigestResponseDTO>;

  send(
    dto: SendDigestRequestDTO,
    actorId?: string,
  ): Promise<DigestResponseDTO>;

  // Queries
  getById(id: string): Promise<DigestResponseDTO>;
  getLatestForUser(userId: string): Promise<DigestResponseDTO | null>;
  list(options: DigestListOptionsDTO): Promise<DigestListResponseDTO>;
}
