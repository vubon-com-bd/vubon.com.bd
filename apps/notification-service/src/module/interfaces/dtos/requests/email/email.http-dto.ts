/**
 * Email HTTP DTOs
 * @module notification-service/interfaces/dtos/requests/email
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { EMAIL_PRIORITY } from '@vubon/shared-constants/platform/notification';

const PRIORITY_VALUES = Object.values(EMAIL_PRIORITY) as string[];

export class EmailAttachmentHttpDTO {
  @ApiProperty()
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  readonly filename!: string;

  @ApiProperty()
  @IsString()
  @MaxLength(100)
  readonly contentType!: string;

  @ApiProperty()
  @IsInt()
  @Min(0)
  readonly size!: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl()
  readonly url?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly content?: string;
}

export class SendEmailHttpDTO {
  @ApiProperty({ oneOf: [{ type: 'string' }, { type: 'array', items: { type: 'string' } }], example: 'user@vubon.com.bd' })
  @IsString()
  readonly to!: string | readonly string[];

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
  @MaxLength(500_000)
  readonly text?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(500_000)
  readonly html?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly templateId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  readonly templateData?: Readonly<Record<string, unknown>>;

  @ApiPropertyOptional({ type: [EmailAttachmentHttpDTO] })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(10)
  readonly attachments?: readonly EmailAttachmentHttpDTO[];

  @ApiPropertyOptional()
  @IsOptional()
  readonly headers?: Readonly<Record<string, string>>;

  @ApiPropertyOptional({ enum: PRIORITY_VALUES })
  @IsOptional()
  @IsEnum(PRIORITY_VALUES)
  readonly priority?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MinLength(8)
  readonly idempotencyKey?: string;
}

export class SendEmailWithTemplateHttpDTO {
  @ApiProperty()
  @IsString()
  readonly to!: string | readonly string[];

  @ApiProperty()
  @IsString()
  @MinLength(1)
  readonly templateSlug!: string;

  @ApiProperty()
  readonly templateData!: Readonly<Record<string, unknown>>;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly locale?: string;

  @ApiPropertyOptional({ enum: PRIORITY_VALUES })
  @IsOptional()
  @IsEnum(PRIORITY_VALUES)
  readonly priority?: string;
}

export class ListEmailsHttpQueryDTO {
  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  readonly page?: number;

  @ApiPropertyOptional({ example: 20, maximum: 100 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  readonly limit?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEmail()
  readonly to?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly status?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly provider?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly fromDate?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly toDate?: string;
}
