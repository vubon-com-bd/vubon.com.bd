import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { DigestEntity } from '../../../domain/entities/digest.entity';
import type { DigestResponseDTO } from '../../dtos/responses/digest-response.dto';

export interface DigestServiceInterface
  extends BaseServiceInterface<DigestEntity, string> {
  findById(id: string): Promise<DigestResponseDTO | null>;
  findByUser(userId: string): Promise<readonly DigestResponseDTO[]>;
  send(digestId: string): Promise<DigestResponseDTO>;
}
