/**
 * Cancel HTTP Request DTOs
 * @module order-service/interfaces/dtos/requests
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RequestCancelHttpDTO {
  @ApiProperty({ example: '7c9e6679-7425-40de-944b-e07fc1f90ae7' })
  readonly orderId!: string;

  @ApiProperty({ example: 'customer_request' })
  readonly reason!: string;

  @ApiPropertyOptional({ example: 'changed my mind' })
  readonly notes?: string;
}

export class ApproveCancelHttpDTO {
  @ApiProperty({ example: '7c9e6679-7425-40de-944b-e07fc1f90ae7' })
  readonly orderId!: string;

  @ApiPropertyOptional({ example: 1500.0 })
  readonly refundAmount?: number;

  @ApiPropertyOptional({ example: 'approved by admin' })
  readonly notes?: string;

  @ApiPropertyOptional({ example: true })
  readonly restockInventory?: boolean;
}

export class RejectCancelHttpDTO {
  @ApiProperty({ example: '7c9e6679-7425-40de-944b-e07fc1f90ae7' })
  readonly orderId!: string;

  @ApiProperty({ example: 'already shipped' })
  readonly reason!: string;
}
