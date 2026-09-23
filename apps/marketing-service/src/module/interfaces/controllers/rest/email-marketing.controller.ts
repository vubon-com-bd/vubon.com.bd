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
import { CreateEmailCampaignCommand } from '../../../application/commands/email-marketing/create-email-campaign.command';
import { SendEmailCampaignCommand } from '../../../application/commands/email-marketing/send-email-campaign.command';
import { ScheduleEmailCampaignCommand } from '../../../application/commands/email-marketing/schedule-email-campaign.command';
import { CreateEmailTemplateCommand } from '../../../application/commands/email-marketing/create-email-template.command';
import {
  CreateEmailCampaignRequestDTO,
  SendEmailCampaignRequestDTO,
  ScheduleEmailCampaignRequestDTO,
  CreateEmailTemplateRequestDTO,
} from '../../dtos/requests/email.request.dto';
import { EmailCampaignResponseDto } from '../../dtos/responses/email.response.dto';

@Controller('email-marketing')
@UseGuards(JwtAuthGuard)
export class EmailMarketingController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('campaigns')
  @HttpCode(HttpStatus.CREATED)
  async createCampaign(
    @Body() body: CreateEmailCampaignRequestDTO,
  ): Promise<EmailCampaignResponseDto> {
    const result = await this.commandBus.execute(
      new CreateEmailCampaignCommand(body.name, body.subject, body.content, body.templateId),
    );
    return result as EmailCampaignResponseDto;
  }

  @Post('campaigns/send')
  @HttpCode(HttpStatus.OK)
  async send(@Body() body: SendEmailCampaignRequestDTO): Promise<EmailCampaignResponseDto> {
    const result = await this.commandBus.execute(
      new SendEmailCampaignCommand(body.campaignId, body.recipientIds),
    );
    return result as EmailCampaignResponseDto;
  }

  @Post('campaigns/schedule')
  @HttpCode(HttpStatus.OK)
  async schedule(
    @Body() body: ScheduleEmailCampaignRequestDTO,
  ): Promise<EmailCampaignResponseDto> {
    const result = await this.commandBus.execute(
      new ScheduleEmailCampaignCommand(body.campaignId, body.scheduledAt),
    );
    return result as EmailCampaignResponseDto;
  }

  @Post('templates')
  @HttpCode(HttpStatus.CREATED)
  async createTemplate(@Body() body: CreateEmailTemplateRequestDTO): Promise<unknown> {
    return this.commandBus.execute(
      new CreateEmailTemplateCommand(body.name, body.subject, body.html, body.language),
    );
  }
}
