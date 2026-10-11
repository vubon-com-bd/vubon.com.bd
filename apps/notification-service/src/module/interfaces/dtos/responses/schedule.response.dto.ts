/**
 * Schedule HTTP Response DTOs
 * @module notification-service/interfaces/dtos/responses
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ScheduleHttpResponseDTO {
  @ApiProperty() id!: string;
  @ApiProperty() type!: string;
  @ApiProperty() status!: string;
  @ApiProperty() recurrence!: string;
  @ApiProperty() scheduledAt!: string;
  @ApiProperty() timezone!: string;
  @ApiPropertyOptional() nextOccurrenceAt?: string;
  @ApiProperty() occurrenceCount!: number;
  @ApiPropertyOptional() maxOccurrences?: number;
  @ApiPropertyOptional() notificationTemplateId?: string;
  @ApiPropertyOptional() userId?: string;
  @ApiProperty() createdBy!: string;
  @ApiPropertyOptional() lastTriggeredAt?: string;
  @ApiProperty() createdAt!: string;
  @ApiProperty() updatedAt!: string;
}
