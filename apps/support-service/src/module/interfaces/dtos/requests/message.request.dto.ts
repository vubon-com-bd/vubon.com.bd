import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SendMessageRequestDto {
  @ApiProperty()
  ticketId!: string;

  @ApiProperty()
  senderId!: string;

  @ApiProperty()
  content!: string;

  @ApiPropertyOptional({ example: 'text' })
  type?: string;

  @ApiPropertyOptional({ example: false })
  isInternal?: boolean;
}
