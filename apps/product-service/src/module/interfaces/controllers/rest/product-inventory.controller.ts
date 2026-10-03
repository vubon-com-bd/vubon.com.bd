/**
 * ProductInventoryController
 */
import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard, RolesGuard } from '@vubon/shared-kernel/interfaces/guards';
import { Roles, CurrentUser } from '@vubon/shared-kernel/interfaces/decorators';
import type { CurrentUserShape } from '@vubon/shared-kernel/interfaces/decorators';

import { AdjustInventoryCommand } from '../../../application/commands/inventory/adjust-inventory.command.js';
import { ReserveInventoryCommand } from '../../../application/commands/inventory/reserve-inventory.command.js';
import { ReleaseInventoryCommand } from '../../../application/commands/inventory/release-inventory.command.js';
import { ListInventoryByProductQuery } from '../../../application/queries/inventory/list-inventory-by-product.query.js';
import { ListLowStockQuery } from '../../../application/queries/inventory/list-low-stock.query.js';

import { InventoryResponseDTO } from '../../dtos/responses/inventory.response.dto.js';

@ApiTags('inventory')
@ApiBearerAuth('bearer')
@Controller('inventory')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProductInventoryController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
    super();
  }

  @Get('low-stock')
  @Roles('admin', 'vendor')
  @ApiOperation({ summary: 'List low stock inventory' })
  async lowStock(): Promise<readonly InventoryResponseDTO[]> {
    return this.queryBus.execute(new ListLowStockQuery());
  }

  @Get('product/:productId')
  @Roles('admin', 'vendor')
  @ApiOperation({ summary: 'List inventory for a product' })
  async listByProduct(@Param('productId') productId: string): Promise<readonly InventoryResponseDTO[]> {
    return this.queryBus.execute(new ListInventoryByProductQuery(productId));
  }

  @Patch(':inventoryId/adjust')
  @Roles('admin', 'vendor')
  @ApiOperation({ summary: 'Adjust inventory stock' })
  async adjust(
    @Param('inventoryId') inventoryId: string,
    @Body() body: { delta: number; reason: string; reference?: string },
    @CurrentUser() user: CurrentUserShape,
  ): Promise<InventoryResponseDTO> {
    return this.commandBus.execute(
      new AdjustInventoryCommand({
        inventoryId,
        delta: body.delta,
        reason: body.reason,
        reference: body.reference,
        adjustedBy: user.userId,
      }),
    );
  }

  @Post(':inventoryId/reserve')
  @Roles('admin', 'vendor')
  @ApiOperation({ summary: 'Reserve inventory stock' })
  async reserve(
    @Param('inventoryId') inventoryId: string,
    @Body() body: { amount: number; reference: string },
  ): Promise<InventoryResponseDTO> {
    return this.commandBus.execute(
      new ReserveInventoryCommand({ inventoryId, amount: body.amount, reference: body.reference }),
    );
  }

  @Post(':inventoryId/release')
  @Roles('admin', 'vendor')
  @ApiOperation({ summary: 'Release reserved inventory' })
  async release(
    @Param('inventoryId') inventoryId: string,
    @Body() body: { amount: number; reason: string },
  ): Promise<InventoryResponseDTO> {
    return this.commandBus.execute(
      new ReleaseInventoryCommand({ inventoryId, amount: body.amount, reason: body.reason }),
    );
  }
}
