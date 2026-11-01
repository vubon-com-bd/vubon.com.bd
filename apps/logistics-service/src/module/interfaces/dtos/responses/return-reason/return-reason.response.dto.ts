/**
 * ReturnReason HTTP Response DTOs
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ReturnReasonHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly code!: string;
  @ApiProperty() readonly type!: string;
  @ApiProperty() readonly label!: string;
  @ApiPropertyOptional() readonly description?: string;
  @ApiProperty() readonly requiresPhoto!: boolean;
  @ApiProperty() readonly autoApprove!: boolean;
  @ApiProperty() readonly isActive!: boolean;
  @ApiProperty() readonly priority!: number;
  @ApiPropertyOptional() readonly deactivatedAt?: string;
  @ApiPropertyOptional() readonly deactivateReason?: string;
  @ApiProperty() readonly createdAt!: string;
  @ApiProperty() readonly updatedAt!: string;
}

export class ReturnReasonSummaryHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly code!: string;
  @ApiProperty() readonly type!: string;
  @ApiProperty() readonly label!: string;
  @ApiProperty() readonly isActive!: boolean;
  @ApiProperty() readonly priority!: number;
  @ApiProperty() readonly requiresPhoto!: boolean;
  @ApiProperty() readonly autoApprove!: boolean;
  @ApiProperty() readonly createdAt!: string;
}

export class ReturnReasonListHttpResponseDTO {
  @ApiProperty({ type: [ReturnReasonSummaryHttpResponseDTO] })
  readonly items!: readonly ReturnReasonSummaryHttpResponseDTO[];
  @ApiProperty() readonly total!: number;
  @ApiProperty() readonly page!: number;
  @ApiProperty() readonly limit!: number;
  @ApiProperty() readonly totalPages!: number;
}

export class ReturnReasonStatsHttpResponseDTO {
  @ApiProperty() readonly total!: number;
  @ApiProperty({ type: 'object', additionalProperties: { type: 'number' } })
  readonly byType!: Readonly<Record<string, number>>;
  @ApiProperty({ type: 'object', additionalProperties: { type: 'number' } })
  readonly byLabel!: Readonly<Record<string, number>>;
  @ApiProperty() readonly activeCount!: number;
  @ApiProperty() readonly autoApproveCount!: number;
}

export class ReturnReasonInitiateHttpResponseDTO {
  @ApiProperty() readonly success!: true;
  @ApiProperty() readonly returnReasonId!: string;
  @ApiProperty() readonly code!: string;
  @ApiProperty() readonly isActive!: boolean;
}
