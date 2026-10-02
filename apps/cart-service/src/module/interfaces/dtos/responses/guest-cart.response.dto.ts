import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class GuestCartHttpDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly token!: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly itemCount!: number;
  @ApiProperty() readonly expiresAt!: string;
  @ApiProperty() readonly createdAt!: string;
  @ApiPropertyOptional() readonly mergedIntoCartId?: string;
}

export class MergeHttpDTO {
  @ApiProperty() readonly mergerId!: string;
  @ApiProperty() readonly sourceCartId!: string;
  @ApiProperty() readonly targetCartId!: string;
  @ApiProperty() readonly strategy!: string;
  @ApiProperty() readonly itemsMerged!: number;
  @ApiProperty() readonly itemsDropped!: number;
  @ApiProperty() readonly mergedAt!: string;
}
