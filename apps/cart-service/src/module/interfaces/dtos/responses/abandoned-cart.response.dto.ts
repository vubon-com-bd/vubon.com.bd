import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AbandonedCartResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  cartId!: string;

  @ApiPropertyOptional()
  userId?: string | null;

  @ApiProperty()
  itemCount!: number;

  @ApiProperty()
  subtotalAmount!: number;

  @ApiProperty()
  currency!: string;

  @ApiProperty()
  status!: string;

  @ApiProperty()
  reminderCount!: number;

  @ApiProperty()
  abandonedAt!: string;

  @ApiPropertyOptional()
  recoveredAt?: string | null;
}
