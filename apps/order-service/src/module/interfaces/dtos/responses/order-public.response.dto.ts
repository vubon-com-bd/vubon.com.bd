/**
 * Order Public HTTP Response DTO (customer-safe — NO PII)
 * @module order-service/interfaces/dtos/responses
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class OrderPublicHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly orderNumber!: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly priority!: string;
  @ApiProperty() readonly total!: number;
  @ApiProperty() readonly currency!: string;
  @ApiProperty() readonly createdAt!: string;
  @ApiPropertyOptional() readonly shippedAt?: string;
  @ApiPropertyOptional() readonly deliveredAt?: string;
}
