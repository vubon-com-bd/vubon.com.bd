import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces';
import { UpdateInventoryCommand } from '../../../application/commands/inventory/update-inventory.command';
import { AdjustInventoryCommand } from '../../../application/commands/inventory/adjust-inventory.command';
import { ReserveInventoryCommand } from '../../../application/commands/inventory/reserve-inventory.command';
import { ReleaseInventoryCommand } from '../../../application/commands/inventory/release-inventory.command';
import { GetInventoryQuery } from '../../../application/queries/inventory/get-inventory.query';
import { CheckStockQuery } from '../../../application/queries/inventory/check-stock.query';
import {
  UpdateInventoryHttpDto,
  AdjustInventoryHttpDto,
} from '../../dtos/requests/inventory.request.dto';
import { InventorySwagger } from '../../swagger/inventory.swagger';

@ApiTags('Product Inventory')
@Controller('products/:productId/inventory')
@UseGuards(JwtAuthGuard)
export class ProductInventoryController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @InventorySwagger.Get()
  async get(@Param('productId') productId: string): Promise<unknown> {
    return this.queryBus.execute(new GetInventoryQuery(productId));
  }

  @Get('check')
  async check(
    @Param('productId') productId: string,
    @Body() body: { quantity: number },
  ): Promise<unknown> {
    return this.queryBus.execute(new CheckStockQuery(productId, body.quantity));
  }

  @Post()
  @InventorySwagger.Update()
  async update(
    @Param('productId') productId: string,
    @Body() body: UpdateInventoryHttpDto,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new UpdateInventoryCommand(productId, body.quantity),
    );
  }

  @Post('adjust')
  async adjust(
    @Param('productId') productId: string,
    @Body() body: AdjustInventoryHttpDto,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new AdjustInventoryCommand(productId, body.delta, body.reason),
    );
  }

  @Post('reserve')
  @HttpCode(HttpStatus.NO_CONTENT)
  async reserve(
    @Param('productId') productId: string,
    @Body() body: { quantity: number; orderId: string },
  ): Promise<void> {
    return this.commandBus.execute(
      new ReserveInventoryCommand(productId, body.quantity, body.orderId),
    );
  }

  @Post('release')
  @HttpCode(HttpStatus.NO_CONTENT)
  async release(
    @Param('productId') productId: string,
    @Body() body: { quantity: number; orderId: string },
  ): Promise<void> {
    return this.commandBus.execute(
      new ReleaseInventoryCommand(productId, body.quantity, body.orderId),
    );
  }
}
