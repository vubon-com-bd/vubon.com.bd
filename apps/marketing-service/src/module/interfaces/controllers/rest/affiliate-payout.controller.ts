import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces';
import { RequestPayoutCommand } from '../../../application/commands/affiliate/request-payout.command';
import { RequestPayoutRequestDTO } from '../../dtos/requests/affiliate.request.dto';

@Controller('affiliates/payouts')
@UseGuards(JwtAuthGuard)
export class AffiliatePayoutController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('request')
  @HttpCode(HttpStatus.CREATED)
  async request(@Body() body: RequestPayoutRequestDTO): Promise<unknown> {
    const result = await this.commandBus.execute(
      new RequestPayoutCommand(body.affiliateId, body.amount),
    );
    return result;
  }
}
