import {
  Body,
  Controller,
  Headers,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateGuestCartCommand } from '../../../application/commands/guest/create-guest-cart.command';
import { MergeGuestCartCommand } from '../../../application/commands/guest/merge-guest-cart.command';
import {
  CreateGuestCartRequestDto,
  MergeGuestCartRequestDto,
} from '../../dtos/requests/guest.request.dto';
import { GuestCartSwagger } from '../../swagger/guest-cart.swagger';

@GuestCartSwagger.Tag()
@Controller('v1/cart/guest')
export class GuestCartController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @GuestCartSwagger.Create()
  async create(@Body() body: CreateGuestCartRequestDto): Promise<unknown> {
    void body;
    return this.commandBus.execute(new CreateGuestCartCommand('BDT'));
  }

  @Post('merge')
  @HttpCode(HttpStatus.OK)
  @GuestCartSwagger.Merge()
  async merge(
    @Body() body: MergeGuestCartRequestDto,
    @Headers('x-guest-token') guestToken: string,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new MergeGuestCartCommand(body.guestToken || guestToken, body.userId),
    );
  }
}
