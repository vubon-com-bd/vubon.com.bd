import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, Length } from 'class-validator';

export class ApplyVoucherRequestDto {
  @ApiProperty()
  @IsUUID()
  cartId!: string;

  @ApiProperty({ example: 'GIFT-2024' })
  @IsString()
  @Length(6, 32)
  code!: string;
}

export class RemoveVoucherRequestDto {
  @ApiProperty()
  @IsUUID()
  cartId!: string;

  @ApiProperty()
  @IsString()
  @Length(6, 32)
  code!: string;
}
