/**
 * SubmitFeedbackRequestDTO — HTTP layer
 * @module support-service/interfaces/dtos/requests/feedback
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
  ArrayMaxSize,
} from 'class-validator';

export class SubmitFeedbackRequestDTO {
  @ApiProperty({ example: 'complaint' })
  @IsString()
  type!: string;

  @ApiPropertyOptional({ example: 'Excellent support' })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  title?: string;

  @ApiProperty({ example: 'Agent was very helpful and quick.' })
  @IsString()
  @MinLength(10)
  @MaxLength(5000)
  message!: string;

  @ApiPropertyOptional({ example: 5, minimum: 1, maximum: 5 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  rating?: number;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(5)
  @IsString({ each: true })
  attachments?: string[];

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  @IsBoolean()
  isAnonymous?: boolean;

  @ApiPropertyOptional({ example: 'ticket-uuid' })
  @IsOptional()
  @IsString()
  referenceId?: string;

  @ApiPropertyOptional({ example: 'ticket' })
  @IsOptional()
  @IsString()
  referenceType?: string;
}
