/**
 * Media HTTP Request DTOs
 * @module product-service/interfaces/dtos/requests
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray, IsBoolean, IsEnum, IsInt, IsOptional, IsString,
  IsUrl, IsUUID, Max, Min, ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class MediaItemHttpDTO {
  @ApiProperty()
  @IsUrl()
  readonly url!: string;

  @ApiProperty({ enum: ['image', 'video', 'document'] })
  @IsEnum(['image', 'video', 'document'])
  readonly type!: 'image' | 'video' | 'document';

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly alt?: string;

  @ApiProperty({ example: 0 })
  @IsInt()
  @Min(0)
  readonly order!: number;

  @ApiProperty({ example: false })
  @IsBoolean()
  readonly isPrimary!: boolean;
}

export class AddMediaHttpDTO {
  @ApiProperty({ type: [MediaItemHttpDTO] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MediaItemHttpDTO)
  @Max(30)
  readonly items!: readonly MediaItemHttpDTO[];
}
