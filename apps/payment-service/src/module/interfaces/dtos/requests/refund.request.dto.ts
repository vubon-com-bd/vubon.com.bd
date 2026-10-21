/**
 * Refund HTTP Request DTOs
 * @module payment-service/interfaces/dtos/requests
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Max,
  Min,
  MinLength,
} from 'class-validator';

export class RequestRefundHttpDTO {
  @ApiPropertyOptional({ example: 1500.0 })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(1)
  readonly amount?: number;

  @ApiPropertyOptional({ example: 'customer_request' })
  @IsOptional()
  @IsString()
  readonly reason?: string;

  @ApiPropertyOptional({ example: 'Refund because product not received' })
  @IsOptional()
  @IsString()
  @MinLength(3)
  readonly note?: string;
}

export class ApproveRefundHttpDTO {
  @ApiPropertyOptional({ example: 1500.0 })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  readonly approvedAmount?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly note?: string;
}

export class RejectRefundHttpDTO {
  @ApiProperty({ example: 'Refund window expired' })
  @IsString()
  @MinLength(3)
  readonly reason!: string;
}

export class PartialRefundHttpDTO {
  @ApiProperty({ example: 500.0 })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(1)
  readonly amount!: number;

  @ApiProperty({ example: 'BDT' })
  @IsString()
  @Length(3, 3)
  readonly currency!: string;

  @ApiProperty({ example: 'Partial refund for damaged items' })
  @IsString()
  @MinLength(3)
  readonly reason!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly note?: string;
}

export class ListRefundsHttpQueryDTO {
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
  readonly paymentId?: string;

  @ApiPropertyOptional({ example: 'completed' })
  @IsOptional()
  @IsString()
  readonly status?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly fromDate?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly toDate?: string;
}
