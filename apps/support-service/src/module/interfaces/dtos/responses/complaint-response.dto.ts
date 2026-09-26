/**
 * ComplaintResponseDTO
 * @module support-service/interfaces/dtos/responses
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ComplaintResponseDTO {
  @ApiProperty() id!: string;
  @ApiProperty() complaintNumber!: string;
  @ApiProperty() subject!: string;
  @ApiProperty() description!: string;
  @ApiProperty() type!: string;
  @ApiProperty() status!: string;
  @ApiProperty() severity!: string;
  @ApiPropertyOptional() userId?: string;
  @ApiPropertyOptional() orderId?: string;
  @ApiPropertyOptional() productId?: string;
  @ApiPropertyOptional({ type: [String] }) attachments?: string[];
  @ApiPropertyOptional() assignedTo?: string;
  @ApiPropertyOptional() resolution?: string;
  @ApiPropertyOptional() resolvedAt?: string;
  @ApiPropertyOptional() closedAt?: string;
  @ApiProperty() createdAt!: string;
  @ApiProperty() updatedAt!: string;
}
