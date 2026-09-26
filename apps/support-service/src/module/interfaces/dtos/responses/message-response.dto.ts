/**
 * MessageResponseDTO
 * @module support-service/interfaces/dtos/responses
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class MessageResponseDTO {
  @ApiProperty() id!: string;
  @ApiProperty() conversationId!: string;
  @ApiPropertyOptional() ticketId?: string;
  @ApiPropertyOptional() senderId?: string;
  @ApiProperty() senderType!: string;
  @ApiPropertyOptional() senderName?: string;
  @ApiProperty() type!: string;
  @ApiProperty() status!: string;
  @ApiPropertyOptional() content?: string;
  @ApiPropertyOptional({ type: [String] }) attachments?: string[];
  @ApiProperty() isInternal!: boolean;
  @ApiPropertyOptional() readAt?: string;
  @ApiPropertyOptional() editedAt?: string;
  @ApiProperty() createdAt!: string;
  @ApiProperty() updatedAt!: string;
}
