import { ApiProperty } from '@nestjs/swagger';

export class SubmitFeedbackRequestDto {
  @ApiProperty()
  userId!: string;

  @ApiProperty({ example: 'suggestion' })
  type!: string;

  @ApiProperty()
  content!: string;
}
