/**
 * Digest HTTP Response DTOs
 * @module notification-service/interfaces/dtos/responses
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class DigestHttpResponseDTO {
  @ApiProperty() id!: string;
  @ApiProperty() userId!: string;
  @ApiProperty() frequency!: string;
  @ApiProperty() type!: string;
  @ApiProperty() status!: string;
  @ApiProperty() periodStart!: string;
  @ApiProperty() periodEnd!: string;
  @ApiProperty() itemCount!: number;
  @ApiProperty({ isArray: true, type: String })
  itemIds!: readonly string[];
  @ApiPropertyOptional() generatedAt?: string;
  @ApiPropertyOptional() sentAt?: string;
  @ApiPropertyOptional() channel?: string;
  @ApiProperty() createdAt!: string;
  @ApiProperty() updatedAt!: string;
}
