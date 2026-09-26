/**
 * ConversationResponseDTO
 * @module support-service/interfaces/dtos/responses
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ConversationResponseDTO {
  @ApiProperty() id!: string;
  @ApiPropertyOptional() title?: string;
  @ApiProperty() type!: string;
  @ApiProperty() status!: string;
  @ApiPropertyOptional() ticketId?: string;
  @ApiProperty({ type: [String] }) participantIds!: string[];
  @ApiProperty() messageCount!: number;
  @ApiProperty() unreadCount!: number;
  @ApiPropertyOptional() lastMessageAt?: string;
  @ApiPropertyOptional() lastMessagePreview?: string;
  @ApiProperty() isLocked!: boolean;
  @ApiProperty() isPinned!: boolean;
  @ApiPropertyOptional() archivedAt?: string;
  @ApiProperty() createdAt!: string;
  @ApiProperty() updatedAt!: string;
}
