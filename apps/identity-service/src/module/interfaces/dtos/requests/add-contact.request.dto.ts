import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';

export class AddContactHttpDTO {
  @ApiProperty({ example: 'email' })
  @IsEnum(['email', 'phone', 'whatsapp', 'telegram', 'website'])
  type!: string;

  @ApiProperty({ example: 'user@example.com' })
  @IsString()
  @MaxLength(255)
  value!: string;

  @ApiPropertyOptional()
  @IsOptional() @IsString() @MaxLength(50) label?: string;

  @ApiPropertyOptional()
  @IsOptional() @IsBoolean() isPrimary?: boolean;
}
