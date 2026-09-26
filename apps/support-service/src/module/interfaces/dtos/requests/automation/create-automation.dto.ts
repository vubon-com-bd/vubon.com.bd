/**
 * CreateAutomationRequestDTO
 * @module support-service/interfaces/dtos/requests/automation
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class AutomationStepInputDTO {
  @ApiProperty() @IsString() id!: string;
  @ApiProperty() @IsInt() @Min(0) order!: number;
  @ApiProperty() @IsString() action!: string;
  @ApiPropertyOptional() @IsOptional() params?: Record<string, unknown>;
  @ApiPropertyOptional() @IsOptional() @IsInt() @Min(0) delayMinutes?: number;
}

export class CreateAutomationRequestDTO {
  @ApiProperty()
  @IsString()
  @MinLength(3)
  @MaxLength(150)
  name!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  description?: string;

  @ApiProperty({ example: 'scheduled' })
  @IsString()
  type!: string;

  @ApiProperty({ example: 'schedule_triggered' })
  @IsString()
  triggerType!: string;

  @ApiProperty({ type: [AutomationStepInputDTO] })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(20)
  @ValidateNested({ each: true })
  @Type(() => AutomationStepInputDTO)
  steps!: AutomationStepInputDTO[];
}
