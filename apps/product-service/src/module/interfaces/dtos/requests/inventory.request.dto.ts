/**
 * Inventory HTTP Request DTOs
 * @module product-service/interfaces/dtos/requests
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum, IsInt, IsOptional, IsString, IsUUID, Min,
} from 'class-validator';

export class UpdateInventoryHttpDTO {
  @ApiProperty()
  @IsInt()
  readonly delta!: number;

  @ApiProperty({ example: 'restock' })
  @IsString()
  readonly reason!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly reference?: string;
}

export class AdjustInventoryHttpDTO {
  @ApiProperty()
  @IsInt()
  readonly delta!: number;

  @ApiProperty({ example: 'adjustment' })
  @IsString()
  readonly reason!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly reference?: string;

  @ApiPropertyOptional({ enum: ['admin', 'vendor', 'staff', 'system'] })
  @IsOptional()
  @IsEnum(['admin', 'vendor', 'staff', 'system'])
  readonly actorRole?: string;
}

export class ReserveInventoryHttpDTO {
  @ApiProperty()
  @IsUUID()
  readonly inventoryId!: string;

  @ApiProperty()
  @IsInt()
  @Min(1)
  readonly quantity!: number;

  @ApiProperty()
  @IsString()
  readonly referenceId!: string;

  @ApiPropertyOptional({ enum: ['order', 'cart', 'manual'] })
  @IsOptional()
  @IsEnum(['order', 'cart', 'manual'])
  readonly referenceType?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(1)
  readonly expiresInMinutes?: number;
}

export class ReleaseInventoryHttpDTO {
  @ApiProperty()
  @IsUUID()
  readonly inventoryId!: string;

  @ApiProperty()
  @IsInt()
  @Min(1)
  readonly quantity!: number;

  @ApiProperty()
  @IsString()
  readonly referenceId!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly reason?: string;
}
