/**
 * ReturnReason HTTP Request DTOs
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean, IsInt, IsOptional, IsString,
  Max, Min, MinLength, MaxLength, ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

const RETURN_REASON_TYPE_VALUES = [
  'damaged', 'wrong_item', 'not_as_described', 'defective', 'changed_mind',
  'late_delivery', 'missing_parts', 'size_issue', 'other',
] as const;

export class ReturnReasonLabelHttpDTO {
  @ApiProperty({ example: 'Damaged in transit' })
  @IsString() @MinLength(2) @MaxLength(200)
  readonly en!: string;

  @ApiPropertyOptional({ example: 'পরিবহনে ক্ষতিগ্রস্ত' })
  @IsOptional() @IsString() @MinLength(2) @MaxLength(200)
  readonly bn?: string;
}

export class CreateReturnReasonHttpDTO {
  @ApiProperty({ example: 'DMG_BOX' })
  @IsString() @MinLength(2) @MaxLength(50)
  readonly code!: string;

  @ApiProperty({ enum: RETURN_REASON_TYPE_VALUES }) @IsString()
  readonly type!: string;

  @ApiProperty({ type: ReturnReasonLabelHttpDTO })
  @ValidateNested() @Type(() => ReturnReasonLabelHttpDTO)
  readonly label!: ReturnReasonLabelHttpDTO;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(500)
  readonly description?: string;

  @ApiProperty() @IsBoolean()
  readonly requiresPhoto!: boolean;

  @ApiProperty() @IsBoolean()
  readonly autoApprove!: boolean;

  @ApiPropertyOptional({ minimum: 0, maximum: 100 }) @IsOptional() @IsInt() @Min(0) @Max(100)
  readonly priority?: number;
}

export class UpdateReturnReasonHttpDTO {
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(500)
  readonly description?: string;

  @ApiPropertyOptional() @IsOptional() @IsBoolean()
  readonly requiresPhoto?: boolean;

  @ApiPropertyOptional() @IsOptional() @IsBoolean()
  readonly autoApprove?: boolean;

  @ApiPropertyOptional({ minimum: 0, maximum: 100 }) @IsOptional() @IsInt() @Min(0) @Max(100)
  readonly priority?: number;
}

export class ReturnReasonDeactivateHttpDTO {
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(500)
  readonly reason?: string;
}

export class ListReturnReasonsHttpQueryDTO {
  @ApiPropertyOptional({ example: 1, minimum: 1 }) @IsOptional() @IsInt() @Min(1)
  readonly page?: number;

  @ApiPropertyOptional({ example: 20, minimum: 1, maximum: 100 }) @IsOptional() @IsInt() @Min(1) @Max(100)
  readonly limit?: number;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(50)
  readonly type?: string;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(50)
  readonly label?: string;

  @ApiPropertyOptional() @IsOptional() @IsBoolean()
  readonly isActive?: boolean;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(200)
  readonly search?: string;

  @ApiPropertyOptional({ enum: ['createdAt', 'priority'] }) @IsOptional() @IsString()
  readonly sortBy?: string;

  @ApiPropertyOptional({ enum: ['asc', 'desc'] }) @IsOptional() @IsString()
  readonly sortDir?: string;
}
