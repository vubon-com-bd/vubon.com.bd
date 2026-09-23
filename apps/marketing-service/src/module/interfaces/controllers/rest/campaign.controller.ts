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
import {
  CurrentUser,
  JwtAuthGuard,
  type CurrentUserShape,
} from '@vubon/shared-kernel/interfaces';
import { CreateCampaignCommand } from '../../../application/commands/campaign/create-campaign.command';
import { LaunchCampaignCommand } from '../../../application/commands/campaign/launch-campaign.command';
import { GetCampaignQuery } from '../../../application/queries/campaign/get-campaign.query';
import { ListCampaignsQuery } from '../../../application/queries/campaign/list-campaigns.query';
import {
  CreateCampaignRequestDTO,
  LaunchCampaignRequestDTO,
} from '../../dtos/requests/campaign.request.dto';
import { CampaignResponseDto } from '../../dtos/responses/campaign.response.dto';
import { CampaignSwagger } from '../../swagger/campaign.swagger';

@CampaignSwagger.Tag()
@Controller('campaigns')
@UseGuards(JwtAuthGuard)
export class CampaignController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @CampaignSwagger.Create()
  async create(
    @Body() body: CreateCampaignRequestDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<CampaignResponseDto> {
    const result = await this.commandBus.execute(
      new CreateCampaignCommand(
        body.name,
        body.type,
        body.channel,
        user.userId,
        body.startDate,
        body.endDate,
      ),
    );
    return result as CampaignResponseDto;
  }

  @Get()
  @CampaignSwagger.List()
  async list(): Promise<readonly CampaignResponseDto[]> {
    const result = await this.queryBus.execute(new ListCampaignsQuery(1, 20));
    return result as readonly CampaignResponseDto[];
  }

  @Get(':id')
  @CampaignSwagger.GetById()
  async getById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<CampaignResponseDto> {
    const result = await this.queryBus.execute(new GetCampaignQuery(id));
    return result as CampaignResponseDto;
  }

  @Post('launch')
  @HttpCode(HttpStatus.OK)
  @CampaignSwagger.Launch()
  async launch(
    @Body() body: LaunchCampaignRequestDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<CampaignResponseDto> {
    const result = await this.commandBus.execute(
      new LaunchCampaignCommand(body.campaignId, user.userId),
    );
    return result as CampaignResponseDto;
  }
}
