/**
 * Brand Request DTOs
 * @module product-service/interfaces/dtos/requests
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBrandRequestDTO {
  @ApiProperty({ example: 'Sony' })
  readonly name!: string;

  @ApiProperty({ example: 'sony' })
  readonly slug!: string;

  @ApiPropertyOptional()
  readonly description?: string;

  @ApiPropertyOptional()
  readonly logoUrl?: string;

  @ApiPropertyOptional()
  readonly website?: string;

  @ApiPropertyOptional({ example: 'BD' })
  readonly country?: string;
}

export class UpdateBrandRequestDTO {
  @ApiProperty()
  readonly brandId!: string;

  @ApiPropertyOptional()
  readonly name?: string;

  @ApiPropertyOptional()
  readonly description?: string;

  @ApiPropertyOptional()
  readonly logoUrl?: string;

  @ApiPropertyOptional()
  readonly website?: string;

  @ApiPropertyOptional()
  readonly country?: string;

  @ApiProperty()
  readonly actorId!: string;
}
