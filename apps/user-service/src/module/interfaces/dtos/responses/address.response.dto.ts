import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AddressResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  userId!: string;

  @ApiProperty()
  type!: string;

  @ApiPropertyOptional()
  label?: string;

  @ApiProperty()
  line1!: string;

  @ApiPropertyOptional()
  line2?: string;

  @ApiProperty()
  city!: string;

  @ApiPropertyOptional()
  state?: string;

  @ApiProperty()
  country!: string;

  @ApiPropertyOptional()
  postalCode?: string;

  @ApiProperty()
  isDefault!: boolean;

  @ApiProperty()
  isDefaultShipping!: boolean;

  @ApiProperty()
  isDefaultBilling!: boolean;

  @ApiProperty()
  createdAt!: string;

  @ApiProperty()
  updatedAt!: string;
}
