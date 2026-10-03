/**
 * Attribute Request DTOs
 * @module product-service/interfaces/dtos/requests
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ATTRIBUTE_TYPE } from '@vubon/shared-constants/business/product';

export class AddAttributeRequestDTO {
  @ApiProperty({ example: '7c9e6679-7425-40de-944b-e07fc1f90ae7' })
  readonly productId!: string;

  @ApiProperty({ example: 'Color' })
  readonly name!: string;

  @ApiProperty({ example: 'color' })
  readonly slug!: string;

  @ApiProperty({ enum: Object.values(ATTRIBUTE_TYPE), example: 'select' })
  readonly type!: string;

  @ApiPropertyOptional({ example: true })
  readonly isRequired?: boolean;

  @ApiPropertyOptional({ example: true })
  readonly isSearchable?: boolean;

  @ApiPropertyOptional({ example: true })
  readonly isFilterable?: boolean;

  @ApiPropertyOptional({ example: 'mm' })
  readonly unit?: string;

  @ApiPropertyOptional({
    type: 'array',
    example: [{ value: 'red', label: 'Red', sortOrder: 1 }],
  })
  readonly options?: readonly { readonly value: string; readonly label: string; readonly sortOrder: number }[];
}

export class UpdateAttributeRequestDTO {
  @ApiProperty({ example: 'attr-uuid' })
  readonly attributeId!: string;

  @ApiPropertyOptional()
  readonly name?: string;

  @ApiPropertyOptional()
  readonly slug?: string;

  @ApiPropertyOptional()
  readonly isRequired?: boolean;

  @ApiPropertyOptional()
  readonly isSearchable?: boolean;

  @ApiPropertyOptional()
  readonly isFilterable?: boolean;

  @ApiPropertyOptional()
  readonly unit?: string;
}
