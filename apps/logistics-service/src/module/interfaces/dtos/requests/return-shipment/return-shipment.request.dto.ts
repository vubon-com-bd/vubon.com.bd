/**
 * ReturnShipment HTTP Request DTOs
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray, IsBoolean, IsNumber, IsOptional, IsString, IsUUID,
  Length, Min, MinLength, MaxLength,
} from 'class-validator';

export class CreateReturnShipmentHttpDTO {
  @ApiProperty() @IsUUID()
  readonly orderId!: string;

  @ApiPropertyOptional() @IsOptional() @IsUUID()
  readonly originalShipmentId?: string;

  @ApiProperty() @IsUUID()
  readonly userId!: string;

  @ApiProperty() @IsString() @MinLength(2) @MaxLength(30)
  readonly type!: string;

  @ApiProperty() @IsString() @MinLength(2) @MaxLength(50)
  readonly reason!: string;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(2000)
  readonly description?: string;

  @ApiPropertyOptional({ type: [String] }) @IsOptional() @IsArray() @IsString({ each: true })
  readonly images?: readonly string[];

  @ApiProperty({ type: [String] }) @IsArray() @IsUUID('4', { each: true })
  readonly itemIds!: readonly string[];

  @ApiProperty() @IsString() @MinLength(5) @MaxLength(500)
  readonly pickupAddress!: string;

  @ApiPropertyOptional({ minLength: 3, maxLength: 3 }) @IsOptional() @IsString() @Length(3, 3)
  readonly refundCurrency?: string;
}

export class ApproveReturnHttpDTO {
  @ApiProperty() @IsString() @MinLength(1) @MaxLength(100)
  readonly approvedBy!: string;
}

export class RejectReturnHttpDTO {
  @ApiProperty() @IsString() @MinLength(3) @MaxLength(500)
  readonly reason!: string;
}

export class MarkReceivedHttpDTO {
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(100)
  readonly receivedBy?: string;
}

export class InspectReturnHttpDTO {
  @ApiProperty() @IsBoolean()
  readonly restockable!: boolean;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(100)
  readonly inspectedBy?: string;
}

export class CompleteReturnHttpDTO {
  @ApiProperty() @IsNumber({ maxDecimalPlaces: 2 }) @Min(0)
  readonly refundAmount!: number;

  @ApiPropertyOptional() @IsOptional() @IsNumber({ maxDecimalPlaces: 2 }) @Min(0)
  readonly restockFeeAmount?: number;
}

export class ReturnShipmentReasonHttpDTO {
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(500)
  readonly reason?: string;
}

export class ListReturnShipmentsHttpQueryDTO {
  @ApiPropertyOptional({ example: 1, minimum: 1 }) @IsOptional() @IsString()
  readonly page?: string;

  @ApiPropertyOptional({ example: 20 }) @IsOptional() @IsString()
  readonly limit?: string;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(50)
  readonly status?: string;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(50)
  readonly type?: string;

  @ApiPropertyOptional() @IsOptional() @IsUUID()
  readonly userId?: string;

  @ApiPropertyOptional() @IsOptional() @IsUUID()
  readonly orderId?: string;
}
