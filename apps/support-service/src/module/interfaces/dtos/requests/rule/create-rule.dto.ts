/**
 * CreateRuleRequestDTO
 * @module support-service/interfaces/dtos/requests/rule
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class RuleConditionInputDTO {
  @ApiProperty({ example: 'priority' })
  @IsString()
  field!: string;

  @ApiProperty({ example: 'equals' })
  @IsString()
  operator!: string;

  @ApiProperty({ example: 'high' })
  value!: unknown;
}

export class RuleActionInputDTO {
  @ApiProperty({ example: 'assign_to_team' })
  @IsString()
  action!: string;

  @ApiPropertyOptional()
  @IsOptional()
  params?: Record<string, unknown>;
}

export class CreateRuleRequestDTO {
  @ApiProperty({ example: 'Auto-assign high priority' })
  @IsString()
  @MinLength(3)
  @MaxLength(150)
  name!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  description?: string;

  @ApiProperty({ example: 'assignment' })
  @IsString()
  type!: string;

  @ApiProperty({ example: 10, minimum: 1, maximum: 100 })
  @IsInt()
  @Min(1)
  @Max(100)
  priority!: number;

  @ApiProperty({ type: [RuleConditionInputDTO] })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(20)
  @ValidateNested({ each: true })
  @Type(() => RuleConditionInputDTO)
  conditions!: RuleConditionInputDTO[];

  @ApiProperty({ type: [RuleActionInputDTO] })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(10)
  @ValidateNested({ each: true })
  @Type(() => RuleActionInputDTO)
  actions!: RuleActionInputDTO[];

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  @IsBoolean()
  stopOnMatch?: boolean;
}
