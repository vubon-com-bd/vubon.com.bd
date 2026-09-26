import { ApiProperty } from '@nestjs/swagger';

export class GuestCartResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  cartId!: string;

  @ApiProperty()
  token!: string;

  @ApiProperty()
  status!: string;

  @ApiProperty()
  itemCount!: number;

  @ApiProperty()
  expiresAt!: string;
}
