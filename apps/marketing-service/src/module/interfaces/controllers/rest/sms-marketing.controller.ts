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
import { CreateSmsCampaignCommand } from '../../../application/commands/sms-marketing/create-sms-campaign.command';
import { SendSmsCampaignCommand } from '../../../application/commands/sms-marketing/send-sms-campaign.command';
import { ScheduleSmsCampaignCommand } from '../../../application/commands/sms-marketing/schedule-sms-campaign.command';
import {
  CreateSmsCampaignRequestDTO,
  SendSmsCampaignRequestDTO,
  ScheduleSmsCampaignRequestDTO,
} from '../../dtos/requests/sms.request.dto';

@Controller('sms-marketing')
@UseGuards(JwtAuthGuard)
export class SmsMarketingController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('campaigns')
  @HttpCode(HttpStatus.CREATED)
  async createCampaign(@Body() body: CreateSmsCampaignRequestDTO): Promise<unknown> {
    return this.commandBus.execute(
      new CreateSmsCampaignCommand(body.name, body.content),
    );
  }

  @Post('campaigns/send')
  @HttpCode(HttpStatus.OK)
  async send(@Body() body: SendSmsCampaignRequestDTO): Promise<unknown> {
    return this.commandBus.execute(
      new SendSmsCampaignCommand(body.campaignId, body.recipientIds),
    );
  }

  @Post('campaigns/schedule')
  @HttpCode(HttpStatus.OK)
  async schedule(@Body() body: ScheduleSmsCampaignRequestDTO): Promise<unknown> {
    return this.commandBus.execute(
      new ScheduleSmsCampaignCommand(body.campaignId, body.scheduledAt),
    );
  }
}
