import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces';
import { RegisterAffiliateCommand } from '../../../application/commands/affiliate/register-affiliate.command';
import { ApproveAffiliateCommand } from '../../../application/commands/affiliate/approve-affiliate.command';
import { GetAffiliateQuery } from '../../../application/queries/affiliate/get-affiliate.query';
import {
  RegisterAffiliateRequestDTO,
  ApproveAffiliateRequestDTO,
} from '../../dtos/requests/affiliate.request.dto';
import { AffiliateResponseDto } from '../../dtos/responses/affiliate.response.dto';
import { AffiliateSwagger } from '../../swagger/affiliate.swagger';

@AffiliateSwagger.Tag()
@Controller('affiliates')
@UseGuards(JwtAuthGuard)
export class AffiliateController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @AffiliateSwagger.Register()
  async register(
    @Body() body: RegisterAffiliateRequestDTO,
  ): Promise<AffiliateResponseDto> {
    const result = await this.commandBus.execute(
      new RegisterAffiliateCommand(body.userId, body.commissionRate),
    );
    return result as AffiliateResponseDto;
  }

  @Get(':id')
  async getById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<AffiliateResponseDto | null> {
    const result = await this.queryBus.execute(new GetAffiliateQuery(id));
    return result as AffiliateResponseDto | null;
  }

  @Post('approve')
  @HttpCode(HttpStatus.OK)
  @AffiliateSwagger.Approve()
  async approve(
    @Body() body: ApproveAffiliateRequestDTO,
  ): Promise<AffiliateResponseDto> {
    const result = await this.commandBus.execute(
      new ApproveAffiliateCommand(body.affiliateId, body.approvedBy),
    );
    return result as AffiliateResponseDto;
  }
}
