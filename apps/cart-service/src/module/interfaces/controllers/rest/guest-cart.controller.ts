/**
 * GuestCartController — REST endpoints
 * @module cart-service/interfaces/controllers/rest
 */
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
import { ApiBearerAuth } from '@nestjs/swagger';
import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { Public } from '@vubon/shared-kernel/interfaces/decorators';

import { CreateGuestCartCommand } from '../../../application/commands/guest/create-guest-cart.command.js';
import { MergeGuestCartCommand } from '../../../application/commands/guest/merge-guest-cart.command.js';

import {
  CreateGuestCartHttpDTO,
  MergeGuestCartHttpDTO,
} from '../../dtos/requests/guest.request.dto.js';
import type {
  GuestCartHttpResponseDTO,
  GuestCartInitiateHttpResponseDTO,
  MergeHttpResponseDTO,
} from '../../dtos/responses/guest-cart.response.dto.js';

import { GuestCartGuard } from '../../guards/guest-cart.guard.js';
import {
  ApiCreateGuestCart,
  ApiMergeGuestCart,
  ApiGetGuestCart,
  ApiExpireGuestCart,
} from '../../swagger/guest-cart.swagger.js';

@Controller('guest-carts')
export class GuestCartController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
    super();
    void this.queryBus;
  }

  @Public()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreateGuestCart()
  async create(
    @Body() dto: CreateGuestCartHttpDTO,
  ): Promise<GuestCartInitiateHttpResponseDTO> {
    return this.commandBus.execute(
      new CreateGuestCartCommand({
        currency: dto.currency ?? 'BDT',
        sessionId: dto.sessionId,
        ttlHours: dto.ttlHours,
      } as never),
    );
  }

  @Public()
  @Post('merge')
  @HttpCode(HttpStatus.OK)
  @ApiMergeGuestCart()
  async merge(@Body() dto: MergeGuestCartHttpDTO): Promise<MergeHttpResponseDTO> {
    return this.commandBus.execute(
      new MergeGuestCartCommand({
        guestToken: dto.guestToken,
        userId: dto.userId,
        strategy: dto.strategy ?? 'sum_quantity',
      } as never),
    );
  }

  @Public()
  @UseGuards(GuestCartGuard)
  @Get(':id')
  @ApiGetGuestCart()
  async getById(@Param('id') id: string): Promise<GuestCartHttpResponseDTO> {
    return { id } as never;
  }

  @Public()
  @UseGuards(GuestCartGuard)
  @Post(':id/expire')
  @HttpCode(HttpStatus.OK)
  @ApiExpireGuestCart()
  async expire(@Param('id') id: string): Promise<GuestCartHttpResponseDTO> {
    return { id } as never;
  }
}
