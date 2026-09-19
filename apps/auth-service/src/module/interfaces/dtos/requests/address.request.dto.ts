import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AddressCreateRequestDTO {
  @ApiProperty({ example: 'home' })
  type!: string;

  @ApiProperty()
  line1!: string;

  @ApiProperty()
  city!: string;

  @ApiProperty()
  country!: string;

  @ApiProperty({ example: false })
  isDefault!: boolean;

  @ApiProperty({ example: false })
  isDefaultShipping!: boolean;

  @ApiProperty({ example: false })
  isDefaultBilling!: boolean;

  @ApiPropertyOptional()
  line2?: string;

  @ApiPropertyOptional()
  state?: string;

  @ApiPropertyOptional()
  postalCode?: string;

  @ApiPropertyOptional()
  label?: string;
}

export class AddressUpdateRequestDTO {
  @ApiPropertyOptional()
  line1?: string;

  @ApiPropertyOptional()
  city?: string;

  @ApiPropertyOptional()
  country?: string;

  @ApiPropertyOptional()
  isDefault?: boolean;

  @ApiPropertyOptional()
  line2?: string;

  @ApiPropertyOptional()
  state?: string;

  @ApiPropertyOptional()
  postalCode?: string;

  @ApiPropertyOptional()
  label?: string;
}

export class AddressDeleteRequestDTO {
  @ApiProperty()
  addressId!: string;
}
