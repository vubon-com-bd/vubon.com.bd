import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateEmailCampaignRequestDTO {
  @ApiProperty({ example: 'Summer Newsletter', minLength: 1, maxLength: 200 })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(200)
  name!: string;

  @ApiProperty({ example: 'Check out our Summer Sale!' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(300)
  subject!: string;

  @ApiProperty({ example: '<h1>Hello</h1>' })
  @IsString()
  @IsNotEmpty()
  content!: string;

  @ApiPropertyOptional({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsOptional()
  @IsUUID()
  templateId?: string;
}

export class SendEmailCampaignRequestDTO {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsUUID()
  campaignId!: string;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsUUID('all', { each: true })
  recipientIds?: readonly string[];
}

export class ScheduleEmailCampaignRequestDTO {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsUUID()
  campaignId!: string;

  @ApiProperty({ example: '2026-07-01T10:00:00.000Z' })
  @IsString()
  scheduledAt!: string;
}

export class CreateEmailTemplateRequestDTO {
  @ApiProperty({ example: 'Welcome Template' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name!: string;

  @ApiProperty({ example: 'Welcome to Vubon!' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(300)
  subject!: string;

  @ApiProperty({ example: '<h1>Hello {{name}}</h1>' })
  @IsString()
  @IsNotEmpty()
  html!: string;

  @ApiPropertyOptional({ example: 'en' })
  @IsOptional()
  @IsString()
  language?: string;
}
