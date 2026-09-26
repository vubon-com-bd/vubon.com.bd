/**
 * TicketResponseDTO — HTTP response shape
 * @module support-service/interfaces/dtos/responses
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class TicketResponseDTO {
  @ApiProperty() id!: string;
  @ApiProperty() ticketNumber!: string;
  @ApiProperty() subject!: string;
  @ApiProperty() description!: string;
  @ApiProperty() status!: string;
  @ApiProperty() priority!: string;
  @ApiProperty() type!: string;
  @ApiProperty() channel!: string;
  @ApiProperty() category!: string;
  @ApiPropertyOptional() customerId?: string;
  @ApiPropertyOptional() assignedTo?: string;
  @ApiPropertyOptional() orderId?: string;
  @ApiPropertyOptional() productId?: string;
  @ApiPropertyOptional({ type: [String] }) tags?: string[];
  @ApiPropertyOptional() resolvedAt?: string;
  @ApiPropertyOptional() closedAt?: string;
  @ApiProperty() createdAt!: string;
  @ApiProperty() updatedAt!: string;
}
