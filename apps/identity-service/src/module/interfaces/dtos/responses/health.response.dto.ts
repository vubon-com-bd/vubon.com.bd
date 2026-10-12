/**
 * Health Response DTO
 * @module identity-service/interfaces/dtos/responses
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class HealthDependencyHttpResponseDTO {
  @ApiProperty() readonly name!: string;
  @ApiProperty() readonly healthy!: boolean;
  @ApiPropertyOptional() readonly message?: string;
}

export class HealthHttpResponseDTO {
  @ApiProperty() readonly service!: string;
  @ApiProperty() readonly healthy!: boolean;
  @ApiProperty() readonly timestamp!: string;
  @ApiProperty({ example: 3600 }) readonly uptimeSeconds!: number;
  @ApiProperty({ type: [HealthDependencyHttpResponseDTO] })
  readonly dependencies!: readonly HealthDependencyHttpResponseDTO[];
}
