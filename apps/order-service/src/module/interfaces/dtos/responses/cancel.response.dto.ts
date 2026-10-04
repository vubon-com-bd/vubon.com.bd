/**
 * Cancel HTTP Response DTO
 * @module order-service/interfaces/dtos/responses
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CancelHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly orderId!: string;
  @ApiProperty() readonly reason!: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly requestedBy!: string;
  @ApiPropertyOptional() readonly approvedBy?: string;
  @ApiPropertyOptional() readonly notes?: string;
  @ApiPropertyOptional() readonly refundAmount?: number;
  @ApiProperty() readonly currency!: string;
  @ApiProperty() readonly restockInventory!: boolean;
  @ApiProperty() readonly requestedAt!: string;
  @ApiPropertyOptional() readonly processedAt?: string;
  @ApiProperty() readonly createdAt!: string;
  @ApiProperty() readonly updatedAt!: string;
}
