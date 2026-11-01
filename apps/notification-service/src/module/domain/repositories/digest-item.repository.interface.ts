/**
 * DigestItem Repository Interface
 * @module notification-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { DigestItemEntity } from '@domain/entities/digest-item.entity.js';
import type { DigestIdVO } from '@domain/primitives/digest-id.vo.js';
import type { NotificationIdVO } from '@domain/primitives/notification-id.vo.js';

export const DIGEST_ITEM_REPOSITORY = Symbol('DIGEST_ITEM_REPOSITORY');

export interface DigestItemRepository extends BaseRepository<DigestItemEntity, string> {
  findByDigest(digestId: DigestIdVO | string): Promise<readonly DigestItemEntity[]>;
  findByNotification(notificationId: NotificationIdVO | string): Promise<readonly DigestItemEntity[]>;
  findByCategory(digestId: string, category: string): Promise<readonly DigestItemEntity[]>;
  findUrgent(digestId: string): Promise<readonly DigestItemEntity[]>;
  countByDigest(digestId: string): Promise<number>;
  deleteByDigest(digestId: string): Promise<number>;
}
