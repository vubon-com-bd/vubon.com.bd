import { ApiProperty } from '@nestjs/swagger';

export class MessageResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  conversationId!: string;

  @ApiProperty()
  senderId!: string;

  @ApiProperty()
  content!: string;

  @ApiProperty()
  type!: string;

  @ApiProperty()
  status!: string;

  @ApiProperty()
  createdAt!: string;
}
