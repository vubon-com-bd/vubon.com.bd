import { ApiProperty } from '@nestjs/swagger';

export class VendorResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  ownerId!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  slug!: string;

  @ApiProperty()
  status!: string;

  @ApiProperty()
  type!: string;

  @ApiProperty()
  tier!: string;

  @ApiProperty()
  createdAt!: string;

  @ApiProperty()
  updatedAt!: string;
}

export class VendorPublicResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  slug!: string;

  @ApiProperty()
  tier!: string;
}
