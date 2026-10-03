import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import { CurrentUser } from '@vubon/shared-kernel/interfaces/decorators';
import type { CurrentUserShape } from '@vubon/shared-kernel/interfaces/decorators';

import { ApplyVoucherCommand } from '../../../application/commands/voucher/apply-voucher.command.js';
import { RemoveVoucherCommand } from '../../../application/commands/voucher/remove-voucher.command.js';
import { ApplyVoucherHttpDTO, RemoveVoucherHttpDTO } from '../../dtos/requests/voucher.request.dto.js';

@ApiTags('cart-vouchers')
@ApiBearerAuth('bearer')
@Controller('cart/:cartId/voucher')
@UseGuards(JwtAuthGuard)
export class CartVoucherController extends BaseController {
  constructor(private readonly commandBus: CommandBus) { super(); }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Apply voucher to cart' })
  async apply(
    @Param('cartId') cartId: string,
    @Body() dto: ApplyVoucherHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ) {
    return this.commandBus.execute(new ApplyVoucherCommand({ cartId, code: dto.code, userId: user.userId }));
  }

  @Delete()
  @ApiOperation({ summary: 'Remove voucher' })
  async remove(
    @Param('cartId') cartId: string,
    @Body() dto: RemoveVoucherHttpDTO,
  ) {
    return this.commandBus.execute(new RemoveVoucherCommand({ cartId, reason: dto.reason }));
  }
}
