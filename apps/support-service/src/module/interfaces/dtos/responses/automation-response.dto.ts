/**
 * AutomationResponseDTO
 * @module support-service/interfaces/dtos/responses
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AutomationStepResponseDTO {
  @ApiProperty() id!: string;
  @ApiProperty() order!: number;
  @ApiProperty() action!: string;
  @ApiProperty() params!: Record<string, unknown>;
  @ApiPropertyOptional() delayMinutes?: number;
}

export class AutomationTriggerResponseDTO {
  @ApiProperty() type!: string;
  @ApiPropertyOptional() conditions?: Record<string, unknown>;
}

export class AutomationResponseDTO {
  @ApiProperty() id!: string;
  @ApiProperty() name!: string;
  @ApiPropertyOptional() description?: string;
  @ApiProperty() type!: string;
  @ApiProperty() status!: string;
  @ApiProperty({ type: AutomationTriggerResponseDTO })
  trigger!: AutomationTriggerResponseDTO;
  @ApiProperty({ type: [AutomationStepResponseDTO] })
  steps!: AutomationStepResponseDTO[];
  @ApiProperty() isActive!: boolean;
  @ApiProperty() executionCount!: number;
  @ApiProperty() successCount!: number;
  @ApiProperty() failureCount!: number;
  @ApiProperty() createdBy!: string;
  @ApiProperty() createdAt!: string;
  @ApiProperty() updatedAt!: string;
}
