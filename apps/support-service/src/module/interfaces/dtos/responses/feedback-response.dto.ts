/**
 * FeedbackResponseDTO
 * @module support-service/interfaces/dtos/responses
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class FeedbackResponseDTO {
  @ApiProperty() id!: string;
  @ApiProperty() type!: string;
  @ApiProperty() status!: string;
  @ApiPropertyOptional() title?: string;
  @ApiProperty() message!: string;
  @ApiPropertyOptional() rating?: number;
  @ApiPropertyOptional({ type: [String] }) attachments?: string[];
  @ApiPropertyOptional() userId?: string;
  @ApiProperty() isAnonymous!: boolean;
  @ApiPropertyOptional() referenceId?: string;
  @ApiPropertyOptional() reviewedBy?: string;
  @ApiPropertyOptional() reviewedAt?: string;
  @ApiProperty() createdAt!: string;
  @ApiProperty() updatedAt!: string;
}
