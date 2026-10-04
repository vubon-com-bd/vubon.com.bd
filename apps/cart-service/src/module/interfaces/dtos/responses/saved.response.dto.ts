import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SavedItemHttpDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly userId!: string;
  @ApiProperty() readonly productId!: string;
  @ApiPropertyOptional() readonly variantId?: string;
  @ApiProperty() readonly quantity!: number;
  @ApiProperty() readonly status!: string;
  @ApiPropertyOptional() readonly notes?: string;
  @ApiProperty() readonly addedAt!: string;
  @ApiProperty() readonly updatedAt!: string;
}

export class SavedListHttpDTO {
  @ApiProperty({ type: [SavedItemHttpDTO] }) readonly items!: readonly SavedItemHttpDTO[];
  @ApiProperty() readonly total!: number;
  @ApiProperty() readonly page!: number;
  @ApiProperty() readonly limit!: number;
  @ApiProperty() readonly totalPages!: number;
}
