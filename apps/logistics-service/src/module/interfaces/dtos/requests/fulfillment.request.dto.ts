import { IsString, IsOptional, IsNumber, IsArray, IsEnum, Min, MinLength, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FULFILLMENT_TYPE, FULFILLMENT_PRIORITY, FULFILLMENT_STATUS } from '@vubon/shared-constants/logistics';

export class CreateFulfillmentHttpDTO {
  @ApiProperty() @IsString() orderId!: string;
  @ApiPropertyOptional() @IsOptional() @IsString() vendorId?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() warehouseId?: string;
  @ApiProperty({ enum: Object.values(FULFILLMENT_TYPE) }) @IsEnum(FULFILLMENT_TYPE) type!: string;
  @ApiPropertyOptional({ enum: Object.values(FULFILLMENT_PRIORITY) }) @IsOptional() @IsEnum(FULFILLMENT_PRIORITY) priority?: string;
  @ApiProperty({ type: [String] }) @IsArray() itemIds!: string[];
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Min(1) @Type(() => Number) slaHours?: number;
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(1000) notes?: string;
}
export class AssignFulfillmentHttpDTO {
  @ApiProperty() @IsString() assignedTo!: string;
}
export class UpdateFulfillmentHttpDTO {
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(1000) notes?: string;
}
export class FulfillmentReasonHttpDTO {
  @ApiProperty() @IsString() @MinLength(2) @MaxLength(500) reason!: string;
}
export class ListFulfillmentsHttpQueryDTO {
  @ApiPropertyOptional() @IsOptional() @IsString() orderId?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() vendorId?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() warehouseId?: string;
  @ApiPropertyOptional({ enum: Object.values(FULFILLMENT_STATUS) }) @IsOptional() @IsEnum(FULFILLMENT_STATUS) status?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() type?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() priority?: string;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Type(() => Number) page?: number;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Type(() => Number) limit?: number;
}
