import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { DigestItemEntity } from '../../../domain/entities/digest-item.entity';

export interface DigestItemServiceInterface
  extends BaseServiceInterface<DigestItemEntity, string> {
  findByDigestId(digestId: string): Promise<readonly DigestItemEntity[]>;
  findUndigested(userId: string): Promise<readonly DigestItemEntity[]>;
}
