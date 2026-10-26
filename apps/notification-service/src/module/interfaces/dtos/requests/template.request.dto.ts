/**
 * Template HTTP Request DTOs
 * @module notification-service/interfaces/dtos/requests
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  IsArray,
  IsBoolean,
  IsEnum,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import {
  NOTIFICATION_TEMPLATE_CATEGORY,
  NOTIFICATION_TEMPLATE_TYPE,
} from '@vubon/shared-constants/platform';

const TYPE_VALUES = Object.values(NOTIFICATION_TEMPLATE_TYPE) as string[];
const CATEGORY_VALUES = Object.values(NOTIFICATION_TEMPLATE_CATEGORY) as string[];

// ═══════════════ Variable DTO ═══════════════
export class TemplateVariableHttpDTO {
  @ApiProperty({ example: 'userName' })
  @IsString()
  @Matches(/^[a-zA-Z_][a-zA-Z0-9_]*$/)
  @MaxLength(50)
  readonly name!: string;

  @ApiProperty({ enum: ['string', 'number', 'boolean', 'date', 'url', 'email'] })
  @IsString()
  readonly type!: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  readonly required!: boolean;

  @ApiPropertyOptional({ example: 'User' })
  @IsOptional()
  @IsString()
  readonly defaultValue?: string;

  @ApiPropertyOptional({ example: 'Customer name' })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  readonly description?: string;
}

// ═══════════════ Create Template ═══════════════
export class CreateTemplateHttpDTO {
  @ApiProperty({ example: 'Order Shipped Template' })
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  readonly name!: string;

  @ApiProperty({ example: 'order-shipped-template' })
  @IsString()
  @Matches(/^[a-z0-9-]+$/)
  readonly slug!: string;

  @ApiProperty({ enum: TYPE_VALUES })
  @IsEnum(TYPE_VALUES)
  readonly type!: string;

  @ApiProperty({ enum: CATEGORY_VALUES })
  @IsEnum(CATEGORY_VALUES)
  readonly category!: string;

  @ApiPropertyOptional({ example: 'en' })
  @IsOptional()
  @IsString()
  readonly locale?: string;

  @ApiPropertyOptional({ example: 'Order {{orderId}} shipped' })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  readonly subject?: string;

  @ApiProperty({ example: 'Hello {{userName}}, your order {{orderId}} is {{status}}.' })
  @IsString()
  @MinLength(1)
  @MaxLength(500000)
  readonly body!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(500000)
  readonly bodyHtml?: string;

  @ApiPropertyOptional({ type: [TemplateVariableHttpDTO] })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(50)
  @ValidateNested({ each: true })
  @Type(() => TemplateVariableHttpDTO)
  readonly variables?: TemplateVariableHttpDTO[];
}

// ═══════════════ Update Template ═══════════════
export class UpdateTemplateHttpDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  readonly name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(200)
  readonly subject?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(500000)
  readonly body?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(500000)
  readonly bodyHtml?: string;

  @ApiPropertyOptional({ type: [TemplateVariableHttpDTO] })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(50)
  @ValidateNested({ each: true })
  @Type(() => TemplateVariableHttpDTO)
  readonly variables?: TemplateVariableHttpDTO[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly status?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly locale?: string;
}

// ═══════════════ Test Template ═══════════════
export class TestTemplateHttpDTO {
  @ApiPropertyOptional({ example: 'test@example.com' })
  @IsOptional()
  @IsString()
  readonly email?: string;

  @ApiPropertyOptional({ example: '+8801712345678' })
  @IsOptional()
  @IsString()
  readonly phone?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly deviceToken?: string;

  @ApiProperty({ example: { userName: 'Test', orderId: 'ORD-001' } })
  readonly variables!: Readonly<Record<string, unknown>>;

  @ApiPropertyOptional({ example: 'en' })
  @IsOptional()
  @IsString()
  readonly locale?: string;
}

// ═══════════════ List Templates Query ═══════════════
export class ListTemplatesHttpQueryDTO {
  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  readonly page?: number;

  @ApiPropertyOptional({ example: 20 })
  @IsOptional()
  readonly limit?: number;

  @ApiPropertyOptional({ enum: TYPE_VALUES })
  @IsOptional()
  @IsEnum(TYPE_VALUES)
  readonly type?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly status?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly locale?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly search?: string;
}
