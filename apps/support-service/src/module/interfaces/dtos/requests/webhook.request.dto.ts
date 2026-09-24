import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class WebhookRequestDto {
  @ApiProperty()
  event!: string;

  @ApiProperty({ type: Object })
  payload!: Record<string, unknown>;

  @ApiPropertyOptional()
  signature?: string;

  @ApiPropertyOptional()
  timestamp?: string;
}
