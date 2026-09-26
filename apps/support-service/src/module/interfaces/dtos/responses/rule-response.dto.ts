/**
 * RuleResponseDTO
 * @module support-service/interfaces/dtos/responses
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RuleConditionResponseDTO {
  @ApiProperty() field!: string;
  @ApiProperty() operator!: string;
  @ApiProperty() value!: unknown;
}

export class RuleActionResponseDTO {
  @ApiProperty() action!: string;
  @ApiPropertyOptional() params?: Record<string, unknown>;
}

export class RuleResponseDTO {
  @ApiProperty() id!: string;
  @ApiProperty() name!: string;
  @ApiPropertyOptional() description?: string;
  @ApiProperty() type!: string;
  @ApiProperty() status!: string;
  @ApiProperty() priority!: number;
  @ApiProperty({ type: [RuleConditionResponseDTO] })
  conditions!: RuleConditionResponseDTO[];
  @ApiProperty({ type: [RuleActionResponseDTO] })
  actions!: RuleActionResponseDTO[];
  @ApiProperty() stopOnMatch!: boolean;
  @ApiProperty() isActive!: boolean;
  @ApiProperty() triggerCount!: number;
  @ApiProperty() createdBy!: string;
  @ApiProperty() createdAt!: string;
  @ApiProperty() updatedAt!: string;
}
