/**
 * Schedule HTTP Response DTOs
 * @module notification-service/interfaces/dtos/responses
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ScheduleHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly name!: string;
  @ApiProperty() readonly type!: string;
  @ApiProperty() readonly recurrence!: string;
  @ApiProperty() readonly status!: string;
  @ApiPropertyOptional() readonly scheduledAt?: string;
  @ApiProperty() readonly timezone!: string;
  @ApiPropertyOptional() readonly cronExpression?: string;
  @ApiPropertyOptional() readonly templateId?: string;
  @ApiProperty() readonly recipientCount!: number;
  @ApiPropertyOptional() readonly nextRunAt?: string;
  @ApiPropertyOptional() readonly lastRunAt?: string;
  @ApiProperty() readonly runCount!: number;
  @ApiProperty() readonly createdAt!: string;
  @ApiProperty() readonly updatedAt!: string;
}

export class ScheduleSummaryHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly name!: string;
  @ApiProperty() readonly status!: string;
  @ApiPropertyOptional() readonly nextRunAt?: string;
  @ApiProperty() readonly runCount!: number;
  @ApiProperty() readonly createdAt!: string;
}

export class ScheduleListHttpResponseDTO {
  @ApiProperty({ type: [ScheduleSummaryHttpResponseDTO] })
  readonly items!: readonly ScheduleSummaryHttpResponseDTO[];
  @ApiProperty() readonly total!: number;
  @ApiProperty() readonly page!: number;
  @ApiProperty() readonly limit!: number;
  @ApiProperty() readonly totalPages!: number;
}
