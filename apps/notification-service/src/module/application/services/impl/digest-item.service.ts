/**
 * DigestItemService
 * @module notification-service/application/services/impl
 */
import { Inject, Injectable } from '@nestjs/common';

import {
  DIGEST_ITEM_REPOSITORY,
  type DigestItemRepository,
} from '@domain/repositories/digest-item.repository.interface.js';
import { DigestIdVO } from '@domain/primitives/digest-id.vo.js';
import { NotificationIdVO } from '@domain/primitives/notification-id.vo.js';
import type { DigestItemEntity } from '@domain/entities/digest-item.entity.js';

import type {
  IDigestItemService,
} from '@application/services/interfaces/digest-item.service.interface.js';
import type { DigestItemResponseDTO } from '@application/dtos/responses/digest-response.dto.js';

@Injectable()
export class DigestItemService implements IDigestItemService {
  constructor(
    @Inject(DIGEST_ITEM_REPOSITORY)
    private readonly repo: DigestItemRepository,
  ) {}

  async listByDigest(digestId: string): Promise<readonly DigestItemResponseDTO[]> {
    const vo = DigestIdVO.create(digestId);
    const items = await this.repo.findByDigest(vo);
    return items.map((e) => this.toDTO(e));
  }

  async listByNotification(notificationId: string): Promise<readonly DigestItemResponseDTO[]> {
    const vo = NotificationIdVO.create(notificationId);
    const items = await this.repo.findByNotification(vo);
    return items.map((e) => this.toDTO(e));
  }

  async listByCategory(digestId: string, category: string): Promise<readonly DigestItemResponseDTO[]> {
    const items = await this.repo.findByCategory(digestId, category);
    return items.map((e) => this.toDTO(e));
  }

  async listUrgent(digestId: string): Promise<readonly DigestItemResponseDTO[]> {
    const items = await this.repo.findUrgent(digestId);
    return items.map((e) => this.toDTO(e));
  }

  async countByDigest(digestId: string): Promise<number> {
    return this.repo.countByDigest(digestId);
  }

  private toDTO(e: DigestItemEntity): DigestItemResponseDTO {
    return {
      id: e.id,
      notificationId: e.item.notificationId.value,
      category: e.item.category.value,
      priority: e.item.priority.value,
      title: e.item.title,
      summary: e.item.summary,
      actionUrl: e.item.actionUrl,
      occurredAt: e.item.occurredAt,
    };
  }
}
