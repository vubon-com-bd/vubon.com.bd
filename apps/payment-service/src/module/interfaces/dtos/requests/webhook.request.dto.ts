/**
 * Webhook HTTP Request DTOs
 * @module payment-service/interfaces/dtos/requests
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsObject,
  IsOptional,
  IsString,
  Max,
  Min,
  MinLength,
} from 'class-validator';

export class ProcessWebhookHttpDTO {
  @ApiProperty({ example: 'bkash' })
  @IsString()
  @MinLength(2)
  readonly gateway!: string;

  @ApiProperty({ example: 'evt_abc123' })
  @IsString()
  @MinLength(4)
  readonly gatewayEventId!: string;

  @ApiProperty({ example: 'payment.succeeded' })
  @IsString()
  @MinLength(3)
  readonly eventType!: string;

  @ApiProperty({ example: { paymentId: '...', status: 'success' } })
  @IsObject()
  readonly payload!: Readonly<Record<string, unknown>>;

  @ApiPropertyOptional({ example: 'sig_abc123...' })
  @IsOptional()
  @IsString()
  readonly signature?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly receivedAt?: string;
}

export class ListWebhookEventsHttpQueryDTO {
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
  @IsString()
  readonly gateway?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly eventType?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  readonly processed?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  readonly verified?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly paymentId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly fromDate?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly toDate?: string;
}
