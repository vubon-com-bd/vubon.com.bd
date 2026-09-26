/**
 * UpdateAutomationRequestDTO
 * @module support-service/interfaces/dtos/requests/automation
 */
import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { AutomationStepInputDTO } from './create-automation.dto';

export class UpdateAutomationRequestDTO {
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

  @ApiPropertyOptional({ type: [AutomationStepInputDTO] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AutomationStepInputDTO)
  steps?: AutomationStepInputDTO[];
}
