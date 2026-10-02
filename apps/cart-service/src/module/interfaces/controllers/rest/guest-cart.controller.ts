import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { Public } from '@vubon/shared-kernel/interfaces/decorators';
import { CurrentUser } from '@vubon/shared-kernel/interfaces/decorators';
import type { CurrentUserShape } from '@vubon/shared-kernel/interfaces/decorators';

import { CreateGuestCartCommand } from '../../../application/commands/guest/create-guest-cart.command.js';
import { MergeGuestCartCommand } from '../../../application/commands/guest/merge-guest-cart.command.js';
import { CreateGuestCartHttpDTO, MergeGuestCartHttpDTO } from '../../dtos/requests/guest.request.dto.js';

@ApiTags('guest-carts')
@Controller('guest-cart')
export class GuestCartController extends BaseController {
  constructor(private readonly commandBus: CommandBus) { super(); }

  @Post()
  @Public()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a guest cart' })
  async create(@Body() dto: CreateGuestCartHttpDTO) {
    return this.commandBus.execute(new CreateGuestCartCommand(dto));
  }

  @Post('merge')
  @ApiOperation({ summary: 'Merge guest cart into user cart' })
  async merge(
    @Body() dto: MergeGuestCartHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ) {
    return this.commandBus.execute(
      new MergeGuestCartCommand({ ...dto, userId: user.userId }),
    );
  }
}
