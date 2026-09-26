import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces';
import { AddItemCommand } from '../../../application/commands/item/add-item.command';
import { UpdateItemCommand } from '../../../application/commands/item/update-item.command';
import { UpdateQuantityCommand } from '../../../application/commands/item/update-quantity.command';
import { SelectItemCommand } from '../../../application/commands/item/select-item.command';
import { RemoveItemCommand } from '../../../application/commands/item/remove-item.command';
import { ListItemsQuery } from '../../../application/queries/item/list-items.query';
import {
  AddItemRequestDto,
  UpdateItemRequestDto,
  UpdateQuantityRequestDto,
  SelectItemRequestDto,
} from '../../dtos/requests/cart-item.request.dto';
import { CartItemSwagger } from '../../swagger/cart-item.swagger';

@CartItemSwagger.Tag()
@Controller('v1/cart/:cartId/items')
@UseGuards(JwtAuthGuard)
export class CartItemController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @CartItemSwagger.Add()
  async add(
    @Param('cartId') cartId: string,
    @Body() body: AddItemRequestDto,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new AddItemCommand(
        cartId,
        body.productId,
        body.quantity,
        body.variantId,
        body.vendorId,
        body.note,
      ),
    );
  }

  @Get()
  @CartItemSwagger.List()
  async list(@Param('cartId') cartId: string): Promise<unknown> {
    return this.queryBus.execute(new ListItemsQuery(cartId));
  }

  @Patch(':itemId')
  async update(
    @Param('cartId') cartId: string,
    @Param('itemId') itemId: string,
    @Body() body: UpdateItemRequestDto,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new UpdateItemCommand(cartId, itemId, 1, body.note),
    );
  }

  @Patch(':itemId/quantity')
  async updateQuantity(
    @Param('cartId') cartId: string,
    @Param('itemId') itemId: string,
    @Body() body: UpdateQuantityRequestDto,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new UpdateQuantityCommand(cartId, itemId, body.quantity),
    );
  }

  @Patch(':itemId/select')
  async select(
    @Param('cartId') cartId: string,
    @Param('itemId') itemId: string,
    @Body() body: SelectItemRequestDto,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new SelectItemCommand(cartId, itemId, body.selected),
    );
  }

  @Delete(':itemId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('cartId') cartId: string,
    @Param('itemId') itemId: string,
  ): Promise<void> {
    await this.commandBus.execute(new RemoveItemCommand(cartId, itemId));
  }
}
