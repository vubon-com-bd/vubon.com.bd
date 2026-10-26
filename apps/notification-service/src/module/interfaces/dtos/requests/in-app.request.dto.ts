/**
 * In-App HTTP Request DTOs
 * @module notification-service/interfaces/dtos/requests
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  IsArray,
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class InAppActionHttpDTO {
  @ApiProperty()
  @IsString()
  @MaxLength(50)
  readonly id!: string;

  @ApiProperty()
  @IsString()
  @MaxLength(50)
  readonly label!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly url?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly action?: string;
}

export class CreateInAppHttpDTO {
  @ApiProperty()
  @IsUUID()
  readonly userId!: string;

  @ApiProperty()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  readonly title!: string;

  @ApiProperty()
  @IsString()
  @MinLength(1)
  @MaxLength(500)
  readonly body!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly type?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly position?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly imageUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly iconUrl?: string;

  @ApiPropertyOptional({ isArray: true, type: InAppActionHttpDTO })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(2)
  readonly actions?: readonly InAppActionHttpDTO[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(60)
  readonly displayDurationSeconds?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  readonly autoDismiss?: boolean;
}

export class DismissInAppHttpDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly dismissedAt?: string;
}
