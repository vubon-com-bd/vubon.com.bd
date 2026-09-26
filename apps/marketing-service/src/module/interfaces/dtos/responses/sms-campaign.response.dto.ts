import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SmsCampaignResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  content!: string;

  @ApiProperty()
  status!: string;

  @ApiPropertyOptional({ nullable: true })
  scheduledAt?: string | null;

  @ApiPropertyOptional({ nullable: true })
  sentAt?: string | null;

  @ApiProperty()
  createdAt!: string;

  @ApiProperty()
  updatedAt!: string;
}
