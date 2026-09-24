import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSurveyRequestDto {
  @ApiProperty()
  title!: string;

  @ApiProperty({ example: 'nps' })
  type!: string;

  @ApiProperty({ type: [Object] })
  questions!: unknown[];
}

export class RespondSurveyRequestDto {
  @ApiProperty()
  userId!: string;

  @ApiProperty({ type: Object })
  answers!: Record<string, unknown>;
}
