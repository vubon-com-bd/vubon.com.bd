import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export enum LeadSourceEnum {
  WEBSITE = 'website',
  LANDING_PAGE = 'landing_page',
  SOCIAL = 'social',
  EMAIL = 'email',
  REFERRAL = 'referral',
  ADS = 'ads',
  ORGANIC = 'organic',
  DIRECT = 'direct',
  EVENT = 'event',
  COLD_CALL = 'cold_call',
}

export class CreateLeadRequestDTO {
  @ApiProperty({ example: 'John Doe', minLength: 1, maxLength: 200 })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(200)
  name!: string;

  @ApiProperty({ example: 'john@example.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ enum: LeadSourceEnum, example: LeadSourceEnum.WEBSITE })
  @IsEnum(LeadSourceEnum)
  source!: string;
}

export class QualifyLeadRequestDTO {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsUUID()
  leadId!: string;
}

export class ConvertLeadRequestDTO {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsUUID()
  leadId!: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsUUID()
  userId!: string;
}

export class AssignLeadRequestDTO {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsUUID()
  leadId!: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsUUID()
  assigneeId!: string;
}
