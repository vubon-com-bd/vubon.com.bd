/**
 * Cart Summary HTTP Response DTOs
 * @module cart-service/interfaces/dtos/responses
 *
 * Lightweight projection for dashboards/list views.
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CartSummaryFullHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly itemCount!: number;
  @ApiProperty() readonly total!: number;
  @ApiProperty() readonly currency!: string;
  @ApiProperty() readonly lastActivityAt!: string;
  @ApiPropertyOptional() readonly lastModified?: string;
}

export class CartSummaryListHttpResponseDTO {
  @ApiProperty({ type: [CartSummaryFullHttpResponseDTO] })
  readonly items!: readonly CartSummaryFullHttpResponseDTO[];
  @ApiProperty() readonly total!: number;
  @ApiProperty() readonly page!: number;
  @ApiProperty() readonly limit!: number;
  @ApiProperty() readonly totalPages!: number;
}
