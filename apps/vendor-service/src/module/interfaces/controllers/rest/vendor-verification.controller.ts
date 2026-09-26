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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces';
import { SubmitVerificationCommand } from '../../../application/commands/verification';
import { ReverifyCommand } from '../../../application/commands/verification';
import { GetVerificationQuery } from '../../../application/queries/verification';
import {
  SubmitVerificationRequestDto,
  ReverifyRequestDto,
} from '../../dtos/requests/verification.request.dto';

@ApiTags('Vendor Verification')
@ApiBearerAuth()
@Controller('vendors/verification')
@UseGuards(JwtAuthGuard)
export class VendorVerificationController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get(':vendorId')
  async get(@Param('vendorId') vendorId: string): Promise<unknown> {
    return this.queryBus.execute(new GetVerificationQuery(vendorId));
  }

  @Post('submit')
  @HttpCode(HttpStatus.CREATED)
  async submit(@Body() body: SubmitVerificationRequestDto): Promise<unknown> {
    return this.commandBus.execute(
      new SubmitVerificationCommand(body.vendorId, body.documents),
    );
  }

  @Post('reverify')
  @HttpCode(HttpStatus.ACCEPTED)
  async reverify(@Body() body: ReverifyRequestDto): Promise<void> {
    return this.commandBus.execute(new ReverifyCommand(body.vendorId, body.reason));
  }
}
