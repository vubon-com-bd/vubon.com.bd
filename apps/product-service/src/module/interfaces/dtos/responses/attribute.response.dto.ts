/**
 * Attribute Response DTO
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AttributeResponseDTO {
  @ApiProperty()
  readonly id!: string;

  @ApiProperty()
  readonly productId!: string;

  @ApiProperty()
  readonly name!: string;

  @ApiProperty()
  readonly slug!: string;

  @ApiProperty()
  readonly type!: string;

  @ApiProperty()
  readonly isRequired!: boolean;

  @ApiProperty()
  readonly isSearchable!: boolean;

  @ApiProperty()
  readonly isFilterable!: boolean;

  @ApiPropertyOptional()
  readonly unit?: string;

  @ApiPropertyOptional({
    type: 'array',
    example: [{ value: 'red', label: 'Red', sortOrder: 1 }],
  })
  readonly options?: readonly { readonly value: string; readonly label: string; readonly sortOrder: number }[];

  @ApiPropertyOptional()
  readonly value?: string | number | boolean | readonly string[];

  @ApiProperty()
  readonly createdAt!: string;

  @ApiProperty()
  readonly updatedAt!: string;
}
