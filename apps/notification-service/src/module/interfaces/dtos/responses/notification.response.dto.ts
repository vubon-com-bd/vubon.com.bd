/**
 * Notification HTTP Response DTOs
 * @module notification-service/interfaces/dtos/responses
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// ═══════════════ Child shapes ═══════════════
export class NotificationActionHttpDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly label!: string;
  @ApiProperty() readonly type!: string;
  @ApiPropertyOptional() readonly url?: string;
  @ApiPropertyOptional({ type: 'object', additionalProperties: true })
  readonly payload?: Readonly<Record<string, unknown>>;
}

export class NotificationDeliveryHttpDTO {
  @ApiProperty() readonly status!: string;
  @ApiPropertyOptional() readonly providerName?: string;
  @ApiPropertyOptional() readonly providerMessageId?: string;
  @ApiProperty() readonly attemptCount!: number;
  @ApiPropertyOptional() readonly deliveredAt?: string;
  @ApiPropertyOptional() readonly failureReason?: string;
}

export class NotificationReadMetadataHttpDTO {
  @ApiProperty() readonly status!: string;
  @ApiPropertyOptional() readonly readAt?: string;
  @ApiPropertyOptional() readonly archivedAt?: string;
  @ApiPropertyOptional() readonly snoozedUntil?: string;
}

// ═══════════════ Full (admin) ═══════════════
export class NotificationHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly userId!: string;
  @ApiProperty() readonly type!: string;
  @ApiProperty() readonly category!: string;
  @ApiProperty() readonly channel!: string;
  @ApiProperty() readonly priority!: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly title!: string;
  @ApiProperty() readonly body!: string;
  @ApiPropertyOptional() readonly imageUrl?: string;
  @ApiPropertyOptional() readonly iconUrl?: string;
  @ApiPropertyOptional() readonly actionUrl?: string;
  @ApiPropertyOptional({ type: [NotificationActionHttpDTO] })
  readonly actions?: readonly NotificationActionHttpDTO[];
  @ApiPropertyOptional({ type: 'object', additionalProperties: true })
  readonly data?: Readonly<Record<string, unknown>>;
  @ApiPropertyOptional({ type: NotificationDeliveryHttpDTO })
  readonly delivery?: NotificationDeliveryHttpDTO;
  @ApiPropertyOptional({ type: NotificationReadMetadataHttpDTO })
  readonly read?: NotificationReadMetadataHttpDTO;
  @ApiPropertyOptional() readonly scheduledAt?: string;
  @ApiPropertyOptional() readonly sentAt?: string;
  @ApiPropertyOptional() readonly deliveredAt?: string;
  @ApiPropertyOptional() readonly expiresAt?: string;
  @ApiPropertyOptional() readonly cancelledAt?: string;
  @ApiPropertyOptional() readonly cancelledBy?: string;
  @ApiPropertyOptional() readonly cancelledReason?: string;
  @ApiProperty() readonly createdAt!: string;
  @ApiProperty() readonly updatedAt!: string;
}

// ═══════════════ Public (customer-safe) ═══════════════
export class NotificationPublicHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly type!: string;
  @ApiProperty() readonly category!: string;
  @ApiProperty() readonly priority!: string;
  @ApiProperty() readonly title!: string;
  @ApiProperty() readonly body!: string;
  @ApiPropertyOptional() readonly imageUrl?: string;
  @ApiPropertyOptional() readonly actionUrl?: string;
  @ApiPropertyOptional({ type: [NotificationActionHttpDTO] })
  readonly actions?: readonly NotificationActionHttpDTO[];
  @ApiProperty() readonly isRead!: boolean;
  @ApiPropertyOptional() readonly readAt?: string;
  @ApiProperty() readonly createdAt!: string;
}

// ═══════════════ Summary (list item) ═══════════════
export class NotificationSummaryHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly title!: string;
  @ApiProperty() readonly type!: string;
  @ApiProperty() readonly channel!: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly priority!: string;
  @ApiProperty() readonly isRead!: boolean;
  @ApiProperty() readonly createdAt!: string;
}

// ═══════════════ List (paginated) ═══════════════
export class NotificationListHttpResponseDTO {
  @ApiProperty({ type: [NotificationSummaryHttpResponseDTO] })
  readonly items!: readonly NotificationSummaryHttpResponseDTO[];
  @ApiProperty() readonly total!: number;
  @ApiProperty() readonly page!: number;
  @ApiProperty() readonly limit!: number;
  @ApiProperty() readonly totalPages!: number;
  @ApiPropertyOptional() readonly unreadCount?: number;
}

// ═══════════════ Stats ═══════════════
export class NotificationStatsHttpResponseDTO {
  @ApiProperty() readonly total!: number;
  @ApiProperty() readonly unreadCount!: number;
  @ApiProperty({ type: 'object', additionalProperties: { type: 'number' } })
  readonly byStatus!: Readonly<Record<string, number>>;
  @ApiProperty({ type: 'object', additionalProperties: { type: 'number' } })
  readonly byChannel!: Readonly<Record<string, number>>;
  @ApiProperty({ type: 'object', additionalProperties: { type: 'number' } })
  readonly byPriority!: Readonly<Record<string, number>>;
}

// ═══════════════ Send response ═══════════════
export class NotificationSendHttpResponseDTO {
  @ApiProperty() readonly success!: true;
  @ApiProperty({ isArray: true })
  readonly notificationIds!: readonly string[];
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly queuedCount!: number;
  @ApiProperty() readonly failedCount!: number;
}

// ═══════════════ User feed ═══════════════
export class NotificationUserFeedHttpResponseDTO {
  @ApiProperty() readonly userId!: string;
  @ApiProperty() readonly unreadCount!: number;
  @ApiProperty() readonly totalCount!: number;
  @ApiProperty({ type: [NotificationPublicHttpResponseDTO] })
  readonly items!: readonly NotificationPublicHttpResponseDTO[];
}
