/**
 * ChatbotResponseDTO
 * @module support-service/interfaces/dtos/responses
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ChatbotIntentConfigResponseDTO {
  @ApiProperty() intent!: string;
  @ApiProperty({ type: [String] }) responses!: string[];
  @ApiPropertyOptional({ type: [String] }) keywords?: string[];
  @ApiProperty() confidence!: number;
  @ApiProperty() isActive!: boolean;
}

export class ChatbotResponseDTO {
  @ApiProperty() id!: string;
  @ApiProperty() name!: string;
  @ApiProperty() type!: string;
  @ApiProperty() status!: string;
  @ApiPropertyOptional() description?: string;
  @ApiProperty({ type: [ChatbotIntentConfigResponseDTO] })
  intents!: ChatbotIntentConfigResponseDTO[];
  @ApiProperty() fallbackMessage!: string;
  @ApiPropertyOptional() handoffMessage?: string;
  @ApiProperty() handoffEnabled!: boolean;
  @ApiProperty({ type: [String] }) languages!: string[];
  @ApiProperty() createdBy!: string;
  @ApiProperty() createdAt!: string;
  @ApiProperty() updatedAt!: string;
}

export class ChatbotReplyResponseDTO {
  @ApiProperty() chatbotId!: string;
  @ApiPropertyOptional() sessionId?: string;
  @ApiProperty() reply!: string;
  @ApiPropertyOptional() intent?: string;
  @ApiProperty() confidence!: number;
  @ApiProperty() shouldEscalate!: boolean;
  @ApiProperty() occurredAt!: string;
}
