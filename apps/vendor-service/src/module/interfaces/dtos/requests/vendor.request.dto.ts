import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RegisterVendorRequestDto {
  @ApiProperty({ example: 'Acme Corporation' })
  businessName!: string;

  @ApiProperty({ example: 'corporation' })
  businessType!: string;

  @ApiPropertyOptional({ example: 'REG-123456' })
  businessRegistration?: string;

  @ApiPropertyOptional({ example: 'We sell electronics' })
  businessDescription?: string;

  @ApiProperty({ example: '+8801712345678' })
  contactPhone!: string;

  @ApiProperty({ example: 'vendor@example.com' })
  contactEmail!: string;

  @ApiProperty({ example: '123 Main Street' })
  addressLine1!: string;

  @ApiPropertyOptional({ example: 'Apt 4B' })
  addressLine2?: string;

  @ApiProperty({ example: 'Dhaka' })
  division!: string;

  @ApiProperty({ example: 'Dhaka' })
  district!: string;

  @ApiPropertyOptional({ example: 'Mirpur' })
  upazila?: string;

  @ApiPropertyOptional({ example: '1216' })
  postalCode?: string;
}

export class UpdateVendorRequestDto {
  @ApiPropertyOptional()
  name?: string;

  @ApiPropertyOptional()
  phone?: string;

  @ApiPropertyOptional()
  email?: string;

  @ApiPropertyOptional()
  description?: string;
}

export class UpdateProfileRequestDto {
  @ApiPropertyOptional()
  displayName?: string;

  @ApiPropertyOptional()
  bio?: string;

  @ApiPropertyOptional()
  avatarUrl?: string;
}

export class UpdateBusinessRequestDto {
  @ApiPropertyOptional()
  businessName?: string;

  @ApiPropertyOptional()
  businessType?: string;

  @ApiPropertyOptional()
  businessRegistration?: string;

  @ApiPropertyOptional()
  businessDescription?: string;
}
