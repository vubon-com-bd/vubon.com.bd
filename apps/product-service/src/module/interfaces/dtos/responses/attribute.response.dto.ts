/**
 * Attribute HTTP Response DTOs
 * @module product-service/interfaces/dtos/responses
 */
import { ApiProperty } from '@nestjs/swagger';

export class AttributeHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly productId!: string;
  @ApiProperty() readonly name!: string;
  @ApiProperty() readonly type!: string;
  @ApiProperty({ type: [String] }) readonly values!: readonly string[];
  @ApiProperty() readonly isRequired!: boolean;
  @ApiProperty() readonly isSearchable!: boolean;
  @ApiProperty() readonly isFilterable!: boolean;
  @ApiProperty() readonly unit?: string;
  @ApiProperty() readonly createdAt!: string;
  @ApiProperty() readonly updatedAt!: string;
}
