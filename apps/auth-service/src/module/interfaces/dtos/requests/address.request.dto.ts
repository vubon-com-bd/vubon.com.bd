/**
 * AddressRequestDTO
 * @module auth-service/interfaces/dtos/requests
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AddAddressRequestDTO {
  @ApiProperty({ default: 'Home' })
  label!: string;

  @ApiProperty()
  line1!: string;

  @ApiPropertyOptional()
  line2?: string;

  @ApiProperty()
  division!: string;

  @ApiProperty()
  district!: string;

  @ApiProperty()
  upazila!: string;

  @ApiProperty({ pattern: '^\\d{4}$' })
  postalCode!: string;

  @ApiPropertyOptional({ default: false })
  isDefault?: boolean;
}

export class UpdateAddressRequestDTO {
  @ApiPropertyOptional()
  line1?: string;

  @ApiPropertyOptional()
  line2?: string;

  @ApiPropertyOptional()
  isDefault?: boolean;
}

export class DeleteAddressRequestDTO {
  @ApiProperty({ format: 'uuid' })
  addressId!: string;
}
