/**
 * Channel HTTP Response DTOs (Swagger types)
 * @module notification-service/interfaces/dtos/responses
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class EmailHttpResponseDTO {
  @ApiProperty() id!: string;
  @ApiProperty({ isArray: true }) to!: readonly string[];
  @ApiPropertyOptional({ isArray: true }) cc?: readonly string[];
  @ApiPropertyOptional({ isArray: true }) bcc?: readonly string[];
  @ApiProperty() subject!: string;
  @ApiPropertyOptional() text?: string;
  @ApiPropertyOptional() html?: string;
  @ApiProperty() status!: string;
  @ApiPropertyOptional() sentAt?: string;
  @ApiPropertyOptional() deliveredAt?: string;
  @ApiProperty() createdAt!: string;
  @ApiProperty() updatedAt!: string;
}

export class EmailSendHttpResponseDTO {
  @ApiProperty() success!: boolean;
  @ApiPropertyOptional() messageId?: string;
  @ApiProperty() status!: string;
  @ApiPropertyOptional() error?: string;
}

export class SmsHttpResponseDTO {
  @ApiProperty() id!: string;
  @ApiProperty() to!: string;
  @ApiProperty() message!: string;
  @ApiProperty() status!: string;
  @ApiProperty() segments!: number;
  @ApiProperty() encoding!: string;
  @ApiPropertyOptional() sentAt?: string;
  @ApiPropertyOptional() deliveredAt?: string;
  @ApiProperty() createdAt!: string;
  @ApiProperty() updatedAt!: string;
}

export class SmsSendHttpResponseDTO {
  @ApiProperty() success!: boolean;
  @ApiPropertyOptional() messageId?: string;
  @ApiProperty() status!: string;
  @ApiProperty() segments!: number;
}

export class PushHttpResponseDTO {
  @ApiProperty() id!: string;
  @ApiProperty() token!: string;
  @ApiProperty() title!: string;
  @ApiProperty() body!: string;
  @ApiProperty() status!: string;
  @ApiPropertyOptional() sentAt?: string;
  @ApiPropertyOptional() deliveredAt?: string;
  @ApiProperty() createdAt!: string;
  @ApiProperty() updatedAt!: string;
}

export class PushSendHttpResponseDTO {
  @ApiProperty() success!: boolean;
  @ApiProperty() successCount!: number;
  @ApiProperty() failureCount!: number;
  @ApiPropertyOptional() messageId?: string;
}

export class InAppHttpResponseDTO {
  @ApiProperty() id!: string;
  @ApiProperty() userId!: string;
  @ApiProperty() title!: string;
  @ApiProperty() body!: string;
  @ApiProperty() status!: string;
  @ApiPropertyOptional() readAt?: string;
  @ApiProperty() createdAt!: string;
  @ApiPropertyOptional() expiresAt?: string;
}

export class InAppSendHttpResponseDTO {
  @ApiProperty() success!: boolean;
  @ApiProperty() notificationId!: string;
  @ApiProperty() status!: string;
}

export class InAppInboxHttpResponseDTO {
  @ApiProperty() userId!: string;
  @ApiProperty() unreadCount!: number;
  @ApiProperty() totalCount!: number;
  @ApiProperty({ type: [InAppHttpResponseDTO] })
  notifications!: readonly InAppHttpResponseDTO[];
}
