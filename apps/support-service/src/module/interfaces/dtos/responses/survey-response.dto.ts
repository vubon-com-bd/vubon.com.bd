/**
 * SurveyResponseDTO
 * @module support-service/interfaces/dtos/responses
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SurveyQuestionResponseDTO {
  @ApiProperty() id!: string;
  @ApiProperty() type!: string;
  @ApiProperty() text!: string;
  @ApiProperty() required!: boolean;
  @ApiProperty() order!: number;
}

export class SurveyResponseDTO {
  @ApiProperty() id!: string;
  @ApiProperty() title!: string;
  @ApiPropertyOptional() description?: string;
  @ApiProperty() type!: string;
  @ApiProperty() status!: string;
  @ApiProperty({ type: [SurveyQuestionResponseDTO] })
  questions!: SurveyQuestionResponseDTO[];
  @ApiProperty() isAnonymous!: boolean;
  @ApiPropertyOptional({ type: [String] }) targetAudience?: string[];
  @ApiProperty() startAt!: string;
  @ApiPropertyOptional() endAt?: string;
  @ApiProperty() responseCount!: number;
  @ApiProperty() createdBy!: string;
  @ApiProperty() createdAt!: string;
  @ApiProperty() updatedAt!: string;
}
