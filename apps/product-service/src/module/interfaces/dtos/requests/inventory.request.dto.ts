/**
 * Inventory Request DTOs
 * @module product-service/interfaces/dtos/requests
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateInventoryRequestDTO {
  @ApiProperty({ example: 'inv-uuid' })
  readonly inventoryId!: string;

  @ApiProperty({ example: 50, description: 'Positive to add, negative to remove' })
  readonly delta!: number;

  @ApiProperty({ example: 'manual restock' })
  readonly reason!: string;

  @ApiPropertyOptional({ example: 'PO-2024-001' })
  readonly reference?: string;

  @ApiProperty({ example: 'admin-user-id' })
  readonly adjustedBy!: string;
}

export class AdjustInventoryRequestDTO {
  @ApiProperty()
  readonly inventoryId!: string;

  @ApiProperty()
  readonly delta!: number;

  @ApiProperty()
  readonly reason!: string;

  @ApiPropertyOptional()
  readonly reference?: string;

  @ApiProperty()
  readonly adjustedBy!: string;
}

export class ReserveInventoryRequestDTO {
  @ApiProperty()
  readonly inventoryId!: string;

  @ApiProperty({ example: 2 })
  readonly amount!: number;

  @ApiProperty({ example: 'ORDER-2024-0001' })
  readonly reference!: string;
}

export class ReleaseInventoryRequestDTO {
  @ApiProperty()
  readonly inventoryId!: string;

  @ApiProperty()
  readonly amount!: number;

  @ApiProperty()
  readonly reason!: string;
}
