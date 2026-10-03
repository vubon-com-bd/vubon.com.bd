/**
 * Return HTTP Response DTO
 * @module order-service/interfaces/dtos/responses
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ReturnHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly orderId!: string;
  @ApiProperty() readonly customerId!: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly reason!: string;
  @ApiProperty({ type: [String] }) readonly itemIds!: readonly string[];
  @ApiProperty({ type: [String] }) readonly images!: readonly string[];
  @ApiPropertyOptional() readonly notes?: string;
  @ApiPropertyOptional() readonly refundAmount?: number;
  @ApiPropertyOptional() readonly restockFee?: number;
  @ApiProperty() readonly netRefund!: number;
  @ApiProperty() readonly currency!: string;
  @ApiProperty() readonly requestedAt!: string;
  @ApiPropertyOptional() readonly approvedAt?: string;
  @ApiPropertyOptional() readonly pickedUpAt?: string;
  @ApiPropertyOptional() readonly receivedAt?: string;
  @ApiPropertyOptional() readonly refundedAt?: string;
  @ApiPropertyOptional() readonly closedAt?: string;
  @ApiProperty() readonly createdAt!: string;
  @ApiProperty() readonly updatedAt!: string;
}
