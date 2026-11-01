/**
 * OrderItem HTTP Request DTOs
 * @module order-service/interfaces/dtos/requests
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

export class AddOrderItemHttpDTO {
  @ApiProperty({ example: '7c9e6679-7425-40de-944b-e07fc1f90ae7' })
  @IsUUID()
  readonly orderId!: string;

  @ApiProperty({ example: '7c9e6679-7425-40de-944b-e07fc1f90ae7' })
  @IsUUID()
  readonly productId!: string;

  @ApiPropertyOptional({ example: '7c9e6679-7425-40de-944b-e07fc1f90ae7' })
  @IsOptional()
  @IsUUID()
  readonly variantId?: string;

  @ApiPropertyOptional({ example: '7c9e6679-7425-40de-944b-e07fc1f90ae7' })
  @IsOptional()
  @IsUUID()
  readonly vendorId?: string;

  @ApiProperty({ example: 'SKU-ABC-123' })
  @IsString()
  readonly sku!: string;

  @ApiProperty({ example: 'Product Name' })
  @IsString()
  readonly name!: string;

  @ApiProperty({ example: 2, minimum: 1, maximum: 999 })
  @IsInt()
  @Min(1)
  @Max(999)
  readonly quantity!: number;

  @ApiProperty({ example: 1500 })
  @IsInt()
  @Min(0)
  readonly unitPrice!: number;
}

export class UpdateOrderItemHttpDTO {
  @ApiPropertyOptional({ example: 3 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(999)
  readonly quantity?: number;

  @ApiPropertyOptional({ example: 1200 })
  @IsOptional()
  @IsInt()
  @Min(0)
  readonly unitPrice?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly notes?: string;
}

export class RemoveOrderItemHttpDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly reason?: string;
}
