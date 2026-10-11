/**
 * IDigestService — contract
 * @module notification-service/application/services/interfaces
 */
import type {
  CreateDigestRequestDTO,
  UpdateDigestRequestDTO,
  GetDigestRequestDTO,
  ListDigestsRequestDTO,
  GenerateDigestRequestDTO,
  SendDigestRequestDTO,
  DigestPreviewRequestDTO,
} from '../../dtos/requests/digest/index.js';
import type {
  DigestResponseDTO,
  DigestListResponseDTO,
  DigestPreviewResponseDTO,
} from '../../dtos/responses/digest-response.dto.js';

export const DIGEST_SERVICE = Symbol('DIGEST_SERVICE');

export interface IDigestService {
  create(dto: CreateDigestRequestDTO, actorId?: string): Promise<DigestResponseDTO>;
  update(dto: UpdateDigestRequestDTO, actorId?: string): Promise<DigestResponseDTO>;
  generate(dto: GenerateDigestRequestDTO, actorId?: string): Promise<DigestResponseDTO>;
  send(dto: SendDigestRequestDTO, actorId?: string): Promise<DigestResponseDTO>;
  cancel(digestId: string, actorId?: string): Promise<DigestResponseDTO>;
  preview(dto: DigestPreviewRequestDTO): Promise<DigestPreviewResponseDTO>;
  getById(dto: GetDigestRequestDTO): Promise<DigestResponseDTO>;
  list(dto: ListDigestsRequestDTO): Promise<DigestListResponseDTO>;
}
