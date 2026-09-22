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
import { CreateCartCommand } from '../../../application/commands/cart/create-cart.command';
import { UpdateCartCommand } from '../../../application/commands/cart/update-cart.command';
import { ClearCartCommand } from '../../../application/commands/cart/clear-cart.command';
import { DeleteCartCommand } from '../../../application/commands/cart/delete-cart.command';
import { RecoverCartCommand } from '../../../application/commands/cart/recover-cart.command';
import { GetCartQuery } from '../../../application/queries/cart/get-cart.query';
import { GetCartSummaryQuery } from '../../../application/queries/cart/get-cart-summary.query';
import {
  CreateCartRequestDto,
  UpdateCartRequestDto,
  ClearCartRequestDto,
  RecoverCartRequestDto,
} from '../../dtos/requests/cart.request.dto';
import { CartSwagger } from '../../swagger/cart.swagger';

@CartSwagger.Tag()
@CartSwagger.Auth()
@Controller('v1/cart')
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @CartSwagger.Create()
  async create(@Body() body: CreateCartRequestDto): Promise<unknown> {
    return this.commandBus.execute(
      new CreateCartCommand(body.type, 'BDT', body.userId),
    );
  }

  @Get(':id')
  @CartSwagger.Get()
  async getById(@Param('id') id: string): Promise<unknown> {
    return this.queryBus.execute(new GetCartQuery(id));
  }

  @Get(':id/summary')
  @CartSwagger.Summary()
  async getSummary(@Param('id') id: string): Promise<unknown> {
    return this.queryBus.execute(new GetCartSummaryQuery(id));
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() body: UpdateCartRequestDto,
  ): Promise<unknown> {
    void body;
    return this.commandBus.execute(new UpdateCartCommand(id));
  }

  @Post('clear')
  @HttpCode(HttpStatus.OK)
  async clear(@Body() body: ClearCartRequestDto): Promise<unknown> {
    return this.commandBus.execute(new ClearCartCommand(body.cartId));
  }

  @Post('recover')
  @HttpCode(HttpStatus.OK)
  async recover(
    @Body() body: RecoverCartRequestDto & { userId: string },
  ): Promise<unknown> {
    return this.commandBus.execute(
      new RecoverCartCommand(body.abandonedCartId, body.userId),
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    await this.commandBus.execute(new DeleteCartCommand(id));
  }
}
