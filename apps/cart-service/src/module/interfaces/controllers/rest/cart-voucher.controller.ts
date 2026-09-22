import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces';
import { ApplyVoucherCommand } from '../../../application/commands/voucher/apply-voucher.command';
import { RemoveVoucherCommand } from '../../../application/commands/voucher/remove-voucher.command';
import {
  ApplyVoucherRequestDto,
  RemoveVoucherRequestDto,
} from '../../dtos/requests/voucher.request.dto';

@Controller('v1/cart/vouchers')
@UseGuards(JwtAuthGuard)
export class CartVoucherController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('apply')
  @HttpCode(HttpStatus.OK)
  async apply(@Body() body: ApplyVoucherRequestDto): Promise<unknown> {
    return this.commandBus.execute(
      new ApplyVoucherCommand(body.cartId, body.code),
    );
  }

  @Delete('remove')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Body() body: RemoveVoucherRequestDto): Promise<void> {
    await this.commandBus.execute(
      new RemoveVoucherCommand(body.cartId, body.code),
    );
  }
}
