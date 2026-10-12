import { IsString, IsOptional, IsNumber, IsObject, IsEnum, Min, MinLength, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TRACKING_SOURCE, TRACKING_STATUS } from '@vubon/shared-constants/logistics';

export class StartTrackingHttpDTO {
  @ApiProperty() @IsString() @MinLength(4) @MaxLength(100) trackingNumber!: string;
  @ApiPropertyOptional() @IsOptional() @IsString() shipmentId?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() orderId?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() courierCode?: string;
}

export class RecordTrackingEventHttpDTO {
  @ApiProperty() @IsString() @MinLength(2) @MaxLength(50) event!: string;
  @ApiPropertyOptional({ enum: Object.values(TRACKING_STATUS) }) @IsOptional() @IsEnum(TRACKING_STATUS) status?: string;
  @ApiProperty({ enum: Object.values(TRACKING_SOURCE) }) @IsEnum(TRACKING_SOURCE) source!: string;
  @ApiProperty() @IsString() @MinLength(2) @MaxLength(500) message!: string;
  @ApiPropertyOptional() @IsOptional() @IsString() location?: string;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Type(() => Number) latitude?: number;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Type(() => Number) longitude?: number;
  @ApiPropertyOptional() @IsOptional() @IsString() occurredAt?: string;
  @ApiPropertyOptional() @IsOptional() @IsObject() metadata?: Record<string, unknown>;
}

export class UpdateTrackingEtaHttpDTO {
  @ApiProperty() @IsString() newEta!: string;
}

export class ListTrackingHttpQueryDTO {
  @ApiPropertyOptional() @IsOptional() @IsString() shipmentId?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() orderId?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() status?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() courierCode?: string;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Type(() => Number) page?: number;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Type(() => Number) limit?: number;
}
