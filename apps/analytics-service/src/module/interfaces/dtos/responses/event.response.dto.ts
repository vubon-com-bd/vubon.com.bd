import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class EventResponseDTO {
  @ApiProperty()
  eventId!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  source!: string;

  @ApiProperty()
  timestamp!: string;

  @ApiProperty({ example: ['page', 'duration'] })
  payloadKeys!: string[];

  @ApiProperty()
  payloadSize!: number;

  @ApiProperty()
  processed!: boolean;

  @ApiProperty()
  createdAt!: string;
}

export class TrackEventResponseDTO extends EventResponseDTO {}

export class BatchTrackEventResponseDTO {
  @ApiProperty({ type: [EventResponseDTO] })
  events!: EventResponseDTO[];

  @ApiProperty()
  accepted!: number;

  @ApiProperty()
  rejected!: number;
}
