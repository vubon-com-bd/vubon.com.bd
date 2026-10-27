/**
 * Invoice HTTP Request DTOs
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

export class GenerateInvoiceHttpDTO {
  @ApiPropertyOptional({ example: '7c9e6679-7425-40de-944b-e07fc1f90ae7' })
  @IsOptional()
  @IsUUID()
  readonly orderId?: string;

  @ApiProperty({ example: '7c9e6679-7425-40de-944b-e07fc1f90ae7' })
  @IsUUID()
  readonly userId!: string;

  @ApiProperty({ example: 1000.0 })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  readonly subtotal!: number;

  @ApiPropertyOptional({ example: 150.0, description: 'Explicit tax (legacy mode)' })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  readonly taxAmount?: number;

  // ─── Bangladesh Tax Options ───
  @ApiPropertyOptional({ example: true, description: 'Use BD tax calculation' })
  @IsOptional()
  readonly useBdTax?: boolean;

  @ApiPropertyOptional({ example: 0.15, description: 'VAT rate (0.15 = 15%)' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(1)
  readonly vatRate?: number;

  @ApiPropertyOptional({ example: 0.05, description: 'Supplementary Duty rate' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(5)
  readonly sdRate?: number;

  @ApiPropertyOptional({ example: 0.05, description: 'Advance Income Tax rate' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(1)
  readonly aitRate?: number;

  @ApiPropertyOptional({ example: 0, description: 'VAT Deduction at Source rate' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(1)
  readonly vdsRate?: number;

  @ApiPropertyOptional({ example: false, description: 'Include AIT deduction' })
  @IsOptional()
  readonly includeAit?: boolean;

  @ApiPropertyOptional({ example: false, description: 'Include VDS deduction' })
  @IsOptional()
  readonly includeVds?: boolean;

  @ApiProperty({ example: 'BDT' })
  @IsString()
  @Length(3, 3)
  readonly currency!: string;

  @ApiPropertyOptional({ example: '2024-12-31T23:59:59Z' })
  @IsOptional()
  @IsString()
  readonly dueAt?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly notes?: string;
}

export class SendInvoiceHttpDTO {
  @ApiProperty({ enum: ['email', 'sms', 'link'] })
  @IsEnum(['email', 'sms', 'link'])
  readonly channel!: 'email' | 'sms' | 'link';

  @ApiPropertyOptional({ example: 'customer@example.com' })
  @IsOptional()
  @IsString()
  readonly recipientEmail?: string;

  @ApiPropertyOptional({ example: '+8801700000000' })
  @IsOptional()
  @IsString()
  readonly recipientPhone?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly message?: string;
}

export class VoidInvoiceHttpDTO {
  @ApiProperty({ example: 'Duplicate invoice' })
  @IsString()
  @MinLength(3)
  readonly reason!: string;
}

export class ListInvoicesHttpQueryDTO {
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
  readonly userId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  readonly orderId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly status?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly search?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly fromDate?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly toDate?: string;
}
