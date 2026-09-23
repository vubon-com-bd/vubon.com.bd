import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateSmsCampaignRequestDTO {
  @ApiProperty({ example: 'Order Confirmation', minLength: 1, maxLength: 200 })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(200)
  name!: string;

  @ApiProperty({ example: 'Your order is confirmed!' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(480)
  content!: string;
}

export class SendSmsCampaignRequestDTO {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsUUID()
  campaignId!: string;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsUUID('all', { each: true })
  recipientIds?: readonly string[];
}

export class ScheduleSmsCampaignRequestDTO {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsUUID()
  campaignId!: string;

  @ApiProperty({ example: '2026-07-01T10:00:00.000Z' })
  @IsString()
  scheduledAt!: string;
}
