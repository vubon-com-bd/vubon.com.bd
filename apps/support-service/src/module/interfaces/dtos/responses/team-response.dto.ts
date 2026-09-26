/**
 * TeamResponseDTO
 * @module support-service/interfaces/dtos/responses
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class TeamResponseDTO {
  @ApiProperty() id!: string;
  @ApiProperty() name!: string;
  @ApiPropertyOptional() description?: string;
  @ApiProperty() type!: string;
  @ApiProperty() status!: string;
  @ApiProperty() routing!: string;
  @ApiPropertyOptional() leaderId?: string;
  @ApiProperty({ type: [String] }) memberIds!: string[];
  @ApiProperty({ type: [String] }) skills!: string[];
  @ApiProperty({ type: [String] }) categories!: string[];
  @ApiProperty() maxTickets!: number;
  @ApiProperty() activeTicketCount!: number;
  @ApiProperty() isDefault!: boolean;
  @ApiProperty() createdAt!: string;
  @ApiProperty() updatedAt!: string;
}
