/**
 * MarkMessageReadRequestDTO
 * @module support-service/interfaces/dtos/requests/message
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class MarkMessageReadRequestDTO {
  @ApiProperty({ example: 'message-uuid' })
  @IsString()
  messageId!: string;
}
