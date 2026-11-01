/**
 * Email HTTP Request DTOs
 * @module notification-service/interfaces/dtos/requests
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { EMAIL_PRIORITY } from '@vubon/shared-constants/platform';

const PRIORITY_VALUES = Object.values(EMAIL_PRIORITY) as string[];

export class EmailAttachmentHttpDTO {
  @ApiProperty()
  @IsString()
  @MaxLength(255)
  readonly filename!: string;

  @ApiProperty()
  @IsString()
  readonly contentType!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly url?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly content?: string;
}

export class SendEmailHttpDTO {
  @ApiProperty({ isArray: true, example: ['user@example.com'] })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(100)
  @IsEmail({}, { each: true })
  readonly to!: readonly string[];

  @ApiPropertyOptional({ isArray: true })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(50)
  @IsEmail({}, { each: true })
  readonly cc?: readonly string[];

  @ApiPropertyOptional({ isArray: true })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(50)
  @IsEmail({}, { each: true })
  readonly bcc?: readonly string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsEmail()
  readonly from?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEmail()
  readonly replyTo?: string;

  @ApiProperty()
  @IsString()
  @MinLength(1)
  @MaxLength(200)
  readonly subject!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(500000)
  readonly text?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(500000)
  readonly html?: string;

  @ApiPropertyOptional({ isArray: true, type: EmailAttachmentHttpDTO })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(10)
  readonly attachments?: readonly EmailAttachmentHttpDTO[];

  @ApiPropertyOptional({ enum: PRIORITY_VALUES })
  @IsOptional()
  @IsEnum(PRIORITY_VALUES)
  readonly priority?: string;
}

export class SendTemplateEmailHttpDTO {
  @ApiProperty({ isArray: true })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(100)
  @IsEmail({}, { each: true })
  readonly to!: readonly string[];

  @ApiProperty()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  readonly templateId!: string;

  @ApiProperty()
  readonly templateData!: Readonly<Record<string, unknown>>;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly locale?: string;
}

export class SendBulkEmailHttpDTO {
  @ApiProperty({ isArray: true })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(1000)
  readonly recipients!: readonly {
    readonly email: string;
    readonly templateData?: Readonly<Record<string, unknown>>;
  }[];

  @ApiProperty()
  @IsString()
  readonly templateId!: string;

  @ApiPropertyOptional()
  @IsOptional()
  readonly commonData?: Readonly<Record<string, unknown>>;
}
