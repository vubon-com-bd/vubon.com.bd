/**
 * CreateSurveyRequestDTO — HTTP layer
 * @module support-service/interfaces/dtos/requests/survey
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
  ArrayMaxSize,
  ArrayMinSize,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class SurveyOptionInputDTO {
  @ApiProperty() @IsString() id!: string;
  @ApiProperty() @IsString() label!: string;
  @ApiProperty() @IsString() value!: string;
  @ApiProperty() @IsInt() @Min(0) order!: number;
}

export class SurveyQuestionInputDTO {
  @ApiProperty() @IsString() id!: string;
  @ApiProperty() @IsString() type!: string;
  @ApiProperty() @IsString() @MinLength(3) @MaxLength(500) text!: string;
  @ApiProperty() @IsBoolean() required!: boolean;

  @ApiPropertyOptional({ type: [SurveyOptionInputDTO] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SurveyOptionInputDTO)
  options?: SurveyOptionInputDTO[];

  @ApiProperty() @IsInt() @Min(0) order!: number;
}

export class CreateSurveyRequestDTO {
  @ApiProperty() @IsString() @MinLength(3) @MaxLength(200) title!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  description?: string;

  @ApiProperty() @IsString() type!: string;

  @ApiProperty({ type: [SurveyQuestionInputDTO] })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(50)
  @ValidateNested({ each: true })
  @Type(() => SurveyQuestionInputDTO)
  questions!: SurveyQuestionInputDTO[];

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  targetAudience?: string[];
}
