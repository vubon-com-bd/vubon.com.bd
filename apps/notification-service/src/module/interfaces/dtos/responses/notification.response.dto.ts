/**
 * Notification HTTP Response DTOs (Swagger types)
 * @module notification-service/interfaces/dtos/responses
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class NotificationActionHttpResponseDTO {
  @ApiProperty() action!: string;
  @ApiProperty() type!: string;
  @ApiProperty() label!: string;
  @ApiPropertyOptional() url?: string;
}

export class NotificationHttpResponseDTO {
  @ApiProperty() id!: string;
  @ApiProperty() userId!: string;
  @ApiProperty() type!: string;
  @ApiProperty() category!: string;
  @ApiProperty() channel!: string;
  @ApiProperty() status!: string;
  @ApiProperty() priority!: string;
  @ApiProperty() title!: string;
  @ApiProperty() body!: string;
  @ApiPropertyOptional() imageUrl?: string;
  @ApiPropertyOptional() iconUrl?: string;
  @ApiPropertyOptional({ type: [NotificationActionHttpResponseDTO] })
  actions?: readonly NotificationActionHttpResponseDTO[];
  @ApiPropertyOptional() scheduledAt?: string;
  @ApiPropertyOptional() sentAt?: string;
  @ApiPropertyOptional() deliveredAt?: string;
  @ApiPropertyOptional() readAt?: string;
  @ApiPropertyOptional() expiresAt?: string;
  @ApiProperty() createdAt!: string;
  @ApiProperty() updatedAt!: string;
}

export class NotificationSummaryHttpResponseDTO {
  @ApiProperty() id!: string;
  @ApiProperty() title!: string;
  @ApiProperty() type!: string;
  @ApiProperty() channel!: string;
  @ApiProperty() status!: string;
  @ApiProperty() isRead!: boolean;
  @ApiProperty() createdAt!: string;
}

export class NotificationListHttpResponseDTO {
  @ApiProperty({ type: [NotificationSummaryHttpResponseDTO] })
  items!: readonly NotificationSummaryHttpResponseDTO[];
  @ApiProperty() total!: number;
  @ApiProperty() page!: number;
  @ApiProperty() limit!: number;
  @ApiProperty() totalPages!: number;
  @ApiProperty() unreadCount!: number;
}

export class NotificationSendHttpResponseDTO {
  @ApiProperty() success!: boolean;
  @ApiProperty() notificationId!: string;
  @ApiProperty() status!: string;
  @ApiProperty() channel!: string;
  @ApiPropertyOptional() provider?: string;
  @ApiPropertyOptional() providerMessageId?: string;
  @ApiPropertyOptional() scheduledAt?: string;
}

export class NotificationStatsHttpResponseDTO {
  @ApiProperty() total!: number;
  @ApiProperty() unread!: number;
  @ApiProperty() delivered!: number;
  @ApiProperty() failed!: number;
  @ApiProperty() byChannel!: Readonly<Record<string, number>>;
  @ApiProperty() byStatus!: Readonly<Record<string, number>>;
  @ApiProperty() byCategory!: Readonly<Record<string, number>>;
}
