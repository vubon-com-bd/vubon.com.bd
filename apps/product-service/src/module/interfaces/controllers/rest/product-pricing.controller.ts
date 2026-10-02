/**
 * ProductPricingController
 */
import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard, RolesGuard } from '@vubon/shared-kernel/interfaces/guards';
import { Public, Roles, CurrentUser } from '@vubon/shared-kernel/interfaces/decorators';
import type { CurrentUserShape } from '@vubon/shared-kernel/interfaces/decorators';

import { UpdatePriceCommand } from '../../../application/commands/pricing/update-price.command.js';
import { ApplyDiscountCommand } from '../../../application/commands/pricing/apply-discount.command.js';
import { RemoveDiscountCommand } from '../../../application/commands/pricing/remove-discount.command.js';
import { GetPricingByProductQuery } from '../../../application/queries/pricing/get-pricing-by-product.query.js';
import { QuotePriceQuery } from '../../../application/queries/pricing/quote-price.query.js';

import { PricingResponseDTO } from '../../dtos/responses/pricing.response.dto.js';

@ApiTags('pricing')
@ApiBearerAuth('bearer')
@Controller('pricing')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProductPricingController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
    super();
  }

  @Get('product/:productId')
  @Public()
  @ApiOperation({ summary: 'Get pricing for a product' })
  async getByProduct(@Param('productId') productId: string): Promise<PricingResponseDTO | null> {
    return this.queryBus.execute(new GetPricingByProductQuery(productId));
  }

  @Get('product/:productId/quote')
  @Public()
  @ApiOperation({ summary: 'Quote total price for a quantity' })
  async quote(
    @Param('productId') productId: string,
    @Param('quantity') quantity: string,
  ): Promise<unknown> {
    return this.queryBus.execute(new QuotePriceQuery(productId, Number(quantity)));
  }

  @Patch(':pricingId')
  @Roles('admin', 'vendor')
  @ApiOperation({ summary: 'Update pricing' })
  async update(
    @Param('pricingId') pricingId: string,
    @Body() body: Record<string, number>,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<PricingResponseDTO> {
    return this.commandBus.execute(
      new UpdatePriceCommand({ pricingId, ...body, updatedBy: user.userId } as never),
    );
  }

  @Post('product/:productId/discount')
  @Roles('admin', 'vendor')
  @ApiOperation({ summary: 'Apply discount to product' })
  async applyDiscount(
    @Param('productId') productId: string,
    @Body() body: { discountPercent: number },
    @CurrentUser() user: CurrentUserShape,
  ): Promise<PricingResponseDTO> {
    return this.commandBus.execute(
      new ApplyDiscountCommand(productId, body.discountPercent, user.userId),
    );
  }

  @Post('product/:productId/discount/remove')
  @Roles('admin', 'vendor')
  @ApiOperation({ summary: 'Remove discount from product' })
  async removeDiscount(
    @Param('productId') productId: string,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<PricingResponseDTO> {
    return this.commandBus.execute(new RemoveDiscountCommand(productId, user.userId));
  }
}
