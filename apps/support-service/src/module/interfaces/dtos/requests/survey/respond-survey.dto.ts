/**
 * RespondSurveyRequestDTO
 * @module support-service/interfaces/dtos/requests/survey
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsOptional,
  IsString,
} from 'class-validator';

export class SurveyAnswerInputDTO {
  @ApiProperty() @IsString() questionId!: string;
  @ApiProperty() value!: string | number | string[];
}

export class RespondSurveyRequestDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  userId?: string;

  @ApiProperty({ type: [SurveyAnswerInputDTO] })
  @IsArray()
  @ArrayMinSize(1)
  answers!: SurveyAnswerInputDTO[];
}
