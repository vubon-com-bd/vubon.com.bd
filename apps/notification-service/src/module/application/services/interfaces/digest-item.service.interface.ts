/**
 * IDigestItemService — contract
 * @module notification-service/application/services/interfaces
 */
import type { DigestItemResponseDTO } from '@application/dtos/responses/digest-response.dto.js';

export const DIGEST_ITEM_SERVICE = Symbol('DIGEST_ITEM_SERVICE');

export interface IDigestItemService {
  listByDigest(digestId: string): Promise<readonly DigestItemResponseDTO[]>;
  listByNotification(notificationId: string): Promise<readonly DigestItemResponseDTO[]>;
  listByCategory(digestId: string, category: string): Promise<readonly DigestItemResponseDTO[]>;
  listUrgent(digestId: string): Promise<readonly DigestItemResponseDTO[]>;
  countByDigest(digestId: string): Promise<number>;
}
