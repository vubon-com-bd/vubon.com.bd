/**
 * DigestMapper — Entity → Response DTO
 * @module notification-service/application/mappers
 */
import type { DigestEntity } from '@domain/entities/digest.entity.js';
import type {
  DigestResponseDTO,
  DigestSummaryResponseDTO,
  DigestListResponseDTO,
  DigestItemResponseDTO,
} from '@application/dtos/responses/digest-response.dto.js';

export class DigestMapper {
  static toResponse(entity: DigestEntity): DigestResponseDTO {
    const vo = entity.vo;
    return {
      id: entity.id,
      userId: vo.userId.value,
      frequency: vo.period.frequency as never,
      type: vo.type.value as never,
      status: vo.status.value as never,
      categories: [...vo.categories],
      sendHour: vo.sendHour,
      timezone: vo.timezone,
      itemCount: entity.itemCount,
      items: entity.items.map((i) => this.toItem(i)),
      generatedAt: vo.generatedAt,
      sentAt: vo.sentAt,
    };
  }

  static toSummary(entity: DigestEntity): DigestSummaryResponseDTO {
    const vo = entity.vo;
    return {
      id: entity.id,
      userId: vo.userId.value,
      frequency: vo.period.frequency as never,
      status: vo.status.value as never,
      itemCount: entity.itemCount,
      createdAt: entity.createdAt,
    };
  }

  static toListResponse(
    entities: readonly DigestEntity[],
    total: number,
    page: number,
    limit: number,
  ): DigestListResponseDTO {
    return {
      items: entities.map((e) => this.toSummary(e)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  private static toItem(item: {
    notificationId: { value: string };
    category: { value: string };
    priority: { value: string };
    title: string;
    summary: string;
    actionUrl?: string;
    occurredAt: string;
  }): DigestItemResponseDTO {
    return {
      id: item.notificationId.value,
      notificationId: item.notificationId.value,
      category: item.category.value,
      priority: item.priority.value,
      title: item.title,
      summary: item.summary,
      actionUrl: item.actionUrl,
      occurredAt: item.occurredAt,
    };
  }
}
