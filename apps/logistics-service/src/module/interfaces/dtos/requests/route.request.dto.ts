import { IsString, IsOptional, IsNumber, IsBoolean, IsArray, IsEnum, Min, MinLength, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ROUTE_TYPE, ROUTE_OPTIMIZATION, ROUTE_STATUS } from '@vubon/shared-constants/logistics';

export class CreateRouteHttpDTO {
  @ApiProperty() @IsString() @MinLength(2) @MaxLength(150) name!: string;
  @ApiProperty() @IsString() @MinLength(2) @MaxLength(50) code!: string;
  @ApiProperty({ enum: Object.values(ROUTE_TYPE) }) @IsEnum(ROUTE_TYPE) type!: string;
  @ApiProperty({ enum: Object.values(ROUTE_OPTIMIZATION) }) @IsEnum(ROUTE_OPTIMIZATION) optimization!: string;
  @ApiPropertyOptional() @IsOptional() @IsString() warehouseId?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() vehicleId?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() driverId?: string;
  @ApiProperty() @IsString() scheduledDate!: string;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() isRecurring?: boolean;
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(200) recurrenceRule?: string;
}

class RouteStopHttpDTO {
  @ApiProperty() @IsString() id!: string;
  @ApiProperty() @IsNumber() @Min(0) @Type(() => Number) order!: number;
  @ApiProperty() @IsString() location!: string;
  @ApiProperty() @IsString() address!: string;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Type(() => Number) latitude?: number;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Type(() => Number) longitude?: number;
  @ApiProperty({ type: [String] }) @IsArray() shipmentIds!: string[];
  @ApiPropertyOptional() @IsOptional() @IsString() estimatedArrivalAt?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() notes?: string;
}

export class AddRouteStopHttpDTO {
  @ApiProperty() @IsString() stopId!: string;
  @ApiProperty() @IsNumber() @Min(0) @Type(() => Number) order!: number;
  @ApiProperty() @IsString() location!: string;
  @ApiProperty() @IsString() address!: string;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Type(() => Number) latitude?: number;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Type(() => Number) longitude?: number;
  @ApiProperty({ type: [String] }) @IsArray() shipmentIds!: string[];
  @ApiPropertyOptional() @IsOptional() @IsString() estimatedArrivalAt?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() notes?: string;
}

export class ReorderRouteStopsHttpDTO {
  @ApiProperty({ type: [String] }) @IsArray() orderedStopIds!: string[];
}

export class OptimizeRouteHttpDTO {
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Type(() => Number) startLat?: number;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Type(() => Number) startLng?: number;
}

export class CancelRouteHttpDTO {
  @ApiProperty() @IsString() @MinLength(2) @MaxLength(500) reason!: string;
}

export class ListRoutesHttpQueryDTO {
  @ApiPropertyOptional() @IsOptional() @IsString() status?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() type?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() driverId?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() vehicleId?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() warehouseId?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() search?: string;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Type(() => Number) page?: number;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Type(() => Number) limit?: number;
}
