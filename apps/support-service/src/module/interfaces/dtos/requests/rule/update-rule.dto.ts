/**
 * UpdateRuleRequestDTO
 * @module support-service/interfaces/dtos/requests/rule
 */
import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { RuleConditionInputDTO, RuleActionInputDTO } from './create-rule.dto';

export class UpdateRuleRequestDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(150)
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  description?: string;

  @ApiPropertyOptional({ minimum: 1, maximum: 100 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  priority?: number;

  @ApiPropertyOptional({ type: [RuleConditionInputDTO] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RuleConditionInputDTO)
  conditions?: RuleConditionInputDTO[];

  @ApiPropertyOptional({ type: [RuleActionInputDTO] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RuleActionInputDTO)
  actions?: RuleActionInputDTO[];

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  @IsBoolean()
  stopOnMatch?: boolean;
}
