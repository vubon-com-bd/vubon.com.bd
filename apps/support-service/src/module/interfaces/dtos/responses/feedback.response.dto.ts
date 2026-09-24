import { ApiProperty } from '@nestjs/swagger';

export class FeedbackResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  userId!: string;

  @ApiProperty()
  type!: string;

  @ApiProperty()
  status!: string;

  @ApiProperty()
  content!: string;

  @ApiProperty()
  createdAt!: string;
}
