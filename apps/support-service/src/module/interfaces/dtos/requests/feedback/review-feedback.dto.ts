/**
 * ReviewFeedbackRequestDTO
 * @module support-service/interfaces/dtos/requests/feedback
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class ReviewFeedbackRequestDTO {
  @ApiProperty({ example: 'closed' })
  @IsString()
  status!: string;

  @ApiPropertyOptional({ example: 'Reviewed and acknowledged.' })
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  note?: string;
}
