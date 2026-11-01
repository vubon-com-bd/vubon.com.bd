/**
 * Add Contact HTTP Request DTO
 * @module identity-service/interfaces/dtos/requests/user
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

const CONTACT_TYPES = ['email', 'phone', 'whatsapp', 'telegram', 'other'] as const;

export class AddContactHttpDTO {
  @ApiProperty({ enum: CONTACT_TYPES, example: 'email' })
  @IsEnum(CONTACT_TYPES)
  type!: (typeof CONTACT_TYPES)[number];

  @ApiProperty({ example: 'secondary@example.com' })
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  value!: string;

  @ApiPropertyOptional({ example: 'Work' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  label?: string;

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  @IsBoolean()
  isPrimary?: boolean;
}
