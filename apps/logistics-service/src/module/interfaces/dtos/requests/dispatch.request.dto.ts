import { IsString, IsOptional, IsNumber, IsArray, IsEnum, Min, MinLength, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { DISPATCH_TYPE } from '@vubon/shared-constants/logistics';

export class CreateDispatchHttpDTO {
  @ApiProperty({ enum: Object.values(DISPATCH_TYPE) }) @IsEnum(DISPATCH_TYPE) type!: string;
  @ApiProperty({ type: [String] }) @IsArray() shipmentIds!: string[];
  @ApiPropertyOptional() @IsOptional() @IsString() courierId?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() vehicleId?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() driverId?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() warehouseId?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() estimatedArrivalAt?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(1000) notes?: string;
}
export class AddDispatchShipmentHttpDTO {
  @ApiProperty() @IsString() shipmentId!: string;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Min(1) @Type(() => Number) items?: number;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Min(0) @Type(() => Number) weightKg?: number;
}
export class AssignDispatchHttpDTO {
  @ApiProperty() @IsString() courierId!: string;
  @ApiPropertyOptional() @IsOptional() @IsString() vehicleId?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() driverId?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() warehouseId?: string;
}
export class ManifestHttpDTO {
  @ApiProperty() @IsString() manifestUrl!: string;
}
export class UpdateEtaHttpDTO {
  @ApiProperty() @IsString() newEta!: string;
}
export class DispatchReasonHttpDTO {
  @ApiProperty() @IsString() @MinLength(2) @MaxLength(500) reason!: string;
}
export class ListDispatchesHttpQueryDTO {
  @ApiPropertyOptional() @IsOptional() @IsString() courierId?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() warehouseId?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() driverId?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() status?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() type?: string;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Type(() => Number) page?: number;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Type(() => Number) limit?: number;
}
