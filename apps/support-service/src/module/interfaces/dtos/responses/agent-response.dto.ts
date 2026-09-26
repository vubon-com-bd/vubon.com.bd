/**
 * AgentResponseDTO
 * @module support-service/interfaces/dtos/responses
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AgentResponseDTO {
  @ApiProperty() id!: string;
  @ApiProperty() userId!: string;
  @ApiProperty() name!: string;
  @ApiProperty() email!: string;
  @ApiProperty() status!: string;
  @ApiProperty() level!: string;
  @ApiProperty({ type: [String] }) skills!: string[];
  @ApiProperty({ type: [String] }) teamIds!: string[];
  @ApiProperty({ type: [String] }) languages!: string[];
  @ApiProperty() activeTicketCount!: number;
  @ApiProperty() activeChatCount!: number;
  @ApiProperty() maxConcurrentTickets!: number;
  @ApiProperty() maxConcurrentChats!: number;
  @ApiProperty() resolvedToday!: number;
  @ApiProperty() averageResolutionMinutes!: number;
  @ApiProperty() satisfactionScore!: number;
  @ApiProperty() lastActiveAt!: string;
  @ApiProperty() isAvailable!: boolean;
  @ApiProperty() createdAt!: string;
  @ApiProperty() updatedAt!: string;
}
