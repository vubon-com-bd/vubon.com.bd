/**
 * SlaResponseDTO
 * @module support-service/interfaces/dtos/responses
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SlaResponseDTO {
  @ApiProperty() id!: string;
  @ApiProperty() ticketId!: string;
  @ApiProperty() metric!: string;
  @ApiProperty() targetMinutes!: number;
  @ApiPropertyOptional() actualMinutes?: number;
  @ApiProperty() status!: string;
  @ApiProperty() priority!: string;
  @ApiProperty() dueAt!: string;
  @ApiPropertyOptional() metAt?: string;
  @ApiPropertyOptional() breachedAt?: string;
  @ApiPropertyOptional() remainingMinutes?: number;
  @ApiPropertyOptional() warningThresholdPercent?: number;
  @ApiProperty() createdAt!: string;
  @ApiProperty() updatedAt!: string;
}
