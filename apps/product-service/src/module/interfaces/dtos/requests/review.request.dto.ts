/**
 * Review HTTP Request DTOs
 * @module product-service/interfaces/dtos/requests
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray, IsInt, IsOptional, IsString, IsUUID, Max, Min, MinLength,
} from 'class-validator';

export class SubmitReviewHttpDTO {
  @ApiProperty()
  @IsUUID()
  readonly productId!: string;

  @ApiProperty({ example: 5, minimum: 1, maximum: 5 })
  @IsInt()
  @Min(1)
  @Max(5)
  readonly rating!: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly title?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MinLength(10)
  readonly comment?: string;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  readonly images?: readonly string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly orderId?: string;
}

export class UpdateReviewHttpDTO {
  @ApiPropertyOptional({ minimum: 1, maximum: 5 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  readonly rating?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly title?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MinLength(10)
  readonly comment?: string;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  readonly images?: readonly string[];
}

export class ListReviewsHttpQueryDTO {
  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  readonly page?: number;

  @ApiPropertyOptional({ example: 20, maximum: 100 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  readonly limit?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  readonly productId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly status?: string;

  @ApiPropertyOptional({ minimum: 1, maximum: 5 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  readonly minRating?: number;

  @ApiPropertyOptional({ minimum: 1, maximum: 5 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  readonly maxRating?: number;
}

export class RejectReviewHttpDTO {
  @ApiProperty()
  @IsString()
  @MinLength(3)
  readonly reason!: string;
}
