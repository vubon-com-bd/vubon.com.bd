import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AddAddressRequestDto {
  @ApiProperty({ example: 'home' })
  type!: string;

  @ApiProperty()
  line1!: string;

  @ApiProperty()
  city!: string;

  @ApiProperty()
  district!: string;

  @ApiProperty()
  division!: string;

  @ApiProperty({ example: 'BD' })
  country!: string;

  @ApiProperty({ example: false })
  isDefault!: boolean;

  @ApiPropertyOptional()
  line2?: string;

  @ApiPropertyOptional()
  postalCode?: string;

  @ApiPropertyOptional()
  label?: string;
}

export class UpdateAddressRequestDto {
  @ApiPropertyOptional()
  line1?: string;

  @ApiPropertyOptional()
  line2?: string;

  @ApiPropertyOptional()
  city?: string;

  @ApiPropertyOptional()
  district?: string;

  @ApiPropertyOptional()
  division?: string;

  @ApiPropertyOptional()
  postalCode?: string;

  @ApiPropertyOptional()
  label?: string;

  @ApiPropertyOptional()
  isDefault?: boolean;
}

export class DeleteAddressRequestDto {
  @ApiProperty()
  addressId!: string;
}

export class SetDefaultAddressRequestDto {
  @ApiProperty()
  addressId!: string;
}
