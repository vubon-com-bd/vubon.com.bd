/**
 * Update User HTTP Request DTO
 * @module identity-service/interfaces/dtos/requests/user
 */
import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';

const USER_TYPES = ['individual', 'business', 'vendor', 'admin', 'staff', 'guest'] as const;

export class UpdateUserHttpDTO {
  @ApiPropertyOptional({ example: 'john_doe_updated' })
  @IsOptional()
  @IsString()
  @Matches(/^[a-zA-Z0-9_]{3,30}$/)
  username?: string;

  @ApiPropertyOptional({ example: '+8801712345678' })
  @IsOptional()
  @IsString()
  @Matches(/^(\+880|880|0)1[3-9]\d{8}$/)
  phone?: string;

  @ApiPropertyOptional({ example: 'John' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  firstName?: string;

  @ApiPropertyOptional({ example: 'Doe' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  lastName?: string;

  @ApiPropertyOptional({ enum: USER_TYPES })
  @IsOptional()
  @IsEnum(USER_TYPES)
  type?: (typeof USER_TYPES)[number];
}
