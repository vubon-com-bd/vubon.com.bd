import { IsString, IsOptional, IsNumber, IsEnum, IsArray, Min, MinLength, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { DELIVERY_TYPE } from '@vubon/shared-constants/logistics';

class DeliveryAddressHttpDTO {
  @ApiProperty() @IsString() @MinLength(3) @MaxLength(255) line1!: string;
  @ApiPropertyOptional() @IsOptional() @IsString() line2?: string;
  @ApiProperty() @IsString() city!: string;
  @ApiPropertyOptional() @IsOptional() @IsString() state?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() postalCode?: string;
  @ApiProperty() @IsString() country!: string;
}

export class ScheduleDeliveryHttpDTO {
  @ApiProperty() @IsString() shipmentId!: string;
  @ApiProperty() @IsString() orderId!: string;
  @ApiPropertyOptional() @IsOptional() @IsString() userId?: string;
  @ApiProperty({ enum: Object.values(DELIVERY_TYPE) }) @IsEnum(DELIVERY_TYPE) type!: string;
  @ApiProperty({ type: DeliveryAddressHttpDTO }) @Type(() => DeliveryAddressHttpDTO) deliveryAddress!: DeliveryAddressHttpDTO;
  @ApiPropertyOptional() @IsOptional() @IsString() recipientName?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() recipientPhone?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() scheduledAt?: string;
}

export class AssignDeliveryDriverHttpDTO {
  @ApiProperty() @IsString() driverId!: string;
  @ApiPropertyOptional() @IsOptional() @IsString() vehicleId?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() routeId?: string;
}

export class AddDeliveryAttemptHttpDTO {
  @ApiProperty() @IsString() status!: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(500) reason?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() driverId?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() location?: string;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Type(() => Number) latitude?: number;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Type(() => Number) longitude?: number;
  @ApiPropertyOptional({ type: [String] }) @IsOptional() @IsArray() images?: string[];
  @ApiPropertyOptional() @IsOptional() @IsString() notes?: string;
}

export class CompleteDeliveryHttpDTO {
  @ApiProperty() @IsString() proofType!: 'signature' | 'otp' | 'photo' | 'id_verification' | 'contactless';
  @ApiPropertyOptional() @IsOptional() @IsString() signatureUrl?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() photoUrl?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() otp?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() idNumber?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() recipientName?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() receivedBy?: string;
}

export class FailDeliveryHttpDTO {
  @ApiProperty() @IsString() @MinLength(2) @MaxLength(500) reason!: string;
}

export class RescheduleDeliveryHttpDTO {
  @ApiProperty() @IsString() @MinLength(2) @MaxLength(500) reason!: string;
}

export class CancelDeliveryHttpDTO {
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(500) reason?: string;
}

export class ListDeliveriesHttpQueryDTO {
  @ApiPropertyOptional() @IsOptional() @IsString() shipmentId?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() orderId?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() driverId?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() status?: string;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Type(() => Number) page?: number;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Type(() => Number) limit?: number;
}
