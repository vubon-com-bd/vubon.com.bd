import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsUUID, Length } from 'class-validator';

export class CreateGuestCartRequestDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Length(8, 128)
  token?: string;
}

export class MergeGuestCartRequestDto {
  @ApiProperty()
  @IsString()
  @Length(16, 128)
  guestToken!: string;

  @ApiProperty()
  @IsUUID()
  userId!: string;
}
