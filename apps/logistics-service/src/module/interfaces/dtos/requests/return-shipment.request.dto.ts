import { IsString, IsOptional, IsArray, IsEnum, IsBoolean, IsNumber, Min, MinLength, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { RETURN_SHIPMENT_TYPE, RETURN_SHIPMENT_REASON } from '@vubon/shared-constants/logistics';

class PickupAddressHttpDTO {
  @ApiProperty() @IsString() @MinLength(3) @MaxLength(255) line1!: string;
  @ApiPropertyOptional() @IsOptional() @IsString() line2?: string;
  @ApiProperty() @IsString() city!: string;
  @ApiPropertyOptional() @IsOptional() @IsString() state?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() postalCode?: string;
  @ApiProperty() @IsString() country!: string;
}

export class RequestReturnHttpDTO {
  @ApiProperty() @IsString() orderId!: string;
  @ApiPropertyOptional() @IsOptional() @IsString() originalShipmentId?: string;
  @ApiProperty() @IsString() userId!: string;
  @ApiProperty({ enum: Object.values(RETURN_SHIPMENT_TYPE) }) @IsEnum(RETURN_SHIPMENT_TYPE) type!: string;
  @ApiProperty({ enum: Object.values(RETURN_SHIPMENT_REASON) }) @IsEnum(RETURN_SHIPMENT_REASON) reason!: string;
  @ApiProperty({ type: [String] }) @IsArray() itemIds!: string[];
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(5000) description?: string;
  @ApiPropertyOptional({ type: [String] }) @IsOptional() @IsArray() images?: string[];
  @ApiProperty({ type: PickupAddressHttpDTO }) @Type(() => PickupAddressHttpDTO) pickupAddress!: PickupAddressHttpDTO;
}

export class RejectReturnHttpDTO {
  @ApiProperty() @IsString() @MinLength(2) @MaxLength(500) reason!: string;
}
export class ScheduleReturnPickupHttpDTO {
  @ApiProperty() @IsString() pickupAt!: string;
}
export class PickupReturnHttpDTO {
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(100) trackingNumber?: string;
}
export class InspectReturnHttpDTO {
  @ApiProperty() @IsString() inspectedBy!: string;
  @ApiProperty() @IsBoolean() restockable!: boolean;
}
export class IssueRefundHttpDTO {
  @ApiProperty() @IsNumber() @Min(0) @Type(() => Number) amount!: number;
  @ApiProperty() @IsString() @MaxLength(3) currency!: string;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Min(0) @Type(() => Number) restockFeePercent?: number;
}
export class CancelReturnHttpDTO {
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(500) reason?: string;
}
export class ReturnReasonHttpDTO {
  @ApiProperty() @IsString() @MinLength(2) @MaxLength(500) reason!: string;
}
export class ListReturnsHttpQueryDTO {
  @ApiPropertyOptional() @IsOptional() @IsString() orderId?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() userId?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() originalShipmentId?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() status?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() type?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() reason?: string;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Type(() => Number) page?: number;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Type(() => Number) limit?: number;
}
