/**
 * Fulfillment HTTP Request DTOs
 * @module order-service/interfaces/dtos/requests
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class StartFulfillmentHttpDTO {
  @ApiProperty({ example: '7c9e6679-7425-40de-944b-e07fc1f90ae7' })
  readonly orderId!: string;

  @ApiProperty({ type: [String], example: ['item-id-1', 'item-id-2'] })
  readonly itemIds!: readonly string[];

  @ApiProperty({ example: 'standard' })
  readonly type!: string;

  @ApiPropertyOptional({ example: 'vendor-id' })
  readonly vendorId?: string;

  @ApiPropertyOptional({ example: 'warehouse-id' })
  readonly warehouseId?: string;

  @ApiPropertyOptional({ example: 'courier-id' })
  readonly courierId?: string;
}

export class PackOrderHttpDTO {
  @ApiProperty({ example: '7c9e6679-7425-40de-944b-e07fc1f90ae7' })
  readonly fulfillmentId!: string;

  @ApiProperty({ example: '7c9e6679-7425-40de-944b-e07fc1f90ae7' })
  readonly orderId!: string;

  @ApiPropertyOptional({ example: 1 })
  readonly packageCount?: number;

  @ApiPropertyOptional({ example: 'packed' })
  readonly notes?: string;
}

export class ShipOrderHttpDTO {
  @ApiProperty({ example: '7c9e6679-7425-40de-944b-e07fc1f90ae7' })
  readonly orderId!: string;

  @ApiPropertyOptional({ example: '8a9e6679-7425-40de-944b-e07fc1f90ae8' })
  readonly fulfillmentId?: string;

  @ApiPropertyOptional({ example: 'TRK-ABCD1234' })
  readonly trackingNumber?: string;

  @ApiPropertyOptional({ example: 'courier-id' })
  readonly courierId?: string;

  @ApiPropertyOptional({ example: 'shipped via express' })
  readonly notes?: string;
}

export class CompleteFulfillmentHttpDTO {
  @ApiProperty({ example: '7c9e6679-7425-40de-944b-e07fc1f90ae7' })
  readonly orderId!: string;

  @ApiPropertyOptional({ example: 'completed' })
  readonly notes?: string;
}
