import { ApiProperty } from '@nestjs/swagger';

export class UserAnalyticsResponseDTO {
  @ApiProperty()
  userId!: string;

  @ApiProperty()
  totalSessions!: number;

  @ApiProperty()
  totalEvents!: number;

  @ApiProperty()
  fromDate!: string;

  @ApiProperty()
  toDate!: string;
}

export class TrafficAnalyticsResponseDTO {
  @ApiProperty({
    type: 'array',
    items: {
      type: 'object',
      properties: {
        source: { type: 'string' },
        sessions: { type: 'number' },
      },
    },
  })
  topSources!: readonly {
    readonly source: string;
    readonly sessions: number;
  }[];

  @ApiProperty()
  fromDate!: string;

  @ApiProperty()
  toDate!: string;
}

export class RealTimeAnalyticsResponseDTO {
  @ApiProperty()
  activeSessions!: number;

  @ApiProperty()
  eventsLastWindow!: number;

  @ApiProperty()
  windowMinutes!: number;

  @ApiProperty()
  asOf!: string;
}
