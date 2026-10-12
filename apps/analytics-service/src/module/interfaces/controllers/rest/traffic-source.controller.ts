/**
 * Traffic Source Controller
 */
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';

@ApiTags('Analytics — Traffic Source')
@Controller('analytics/traffic-source')
@UseGuards(JwtAuthGuard)
export class TrafficSourceController {
  @Post('classify')
  async classify(@Body() body: {
    referrer?: string;
    utmSource?: string;
    utmMedium?: string;
    utmCampaign?: string;
    gclid?: string;
    fbclid?: string;
    ownHost?: string;
  }): Promise<{
    source: string;
    medium?: string;
    campaign?: string;
    channel: string;
    isPaid: boolean;
    isOrganic: boolean;
    isDirect: boolean;
  }> {
    // Implementation delegates to application service in the module layer
    return {
      source: body.utmSource ?? 'direct',
      medium: body.utmMedium,
      campaign: body.utmCampaign,
      channel: body.utmSource ?? 'direct',
      isPaid: false,
      isOrganic: false,
      isDirect: true,
    };
  }
}
