import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class StartChatRequestDto {
  @ApiProperty()
  userId!: string;

  @ApiPropertyOptional()
  type?: string;

  @ApiPropertyOptional()
  initialMessage?: string;
}

export class SendChatMessageRequestDto {
  @ApiProperty()
  content!: string;

  @ApiPropertyOptional()
  type?: string;
}
