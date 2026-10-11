/**
 * Template HTTP DTOs
 * @module notification-service/interfaces/dtos/requests/template
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  NOTIFICATION_TEMPLATE_TYPE,
  NOTIFICATION_TEMPLATE_CATEGORY,
} from '@vubon/shared-constants/platform/notification';

const TYPE_VALUES = Object.values(NOTIFICATION_TEMPLATE_TYPE) as string[];
const CATEGORY_VALUES = Object.values(NOTIFICATION_TEMPLATE_CATEGORY) as string[];

export class TemplateVariableHttpDTO {
  @ApiProperty({ example: 'orderNumber' })
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  readonly name!: string;

  @ApiProperty({ enum: ['string', 'number', 'boolean', 'date', 'url', 'email'] })
  @IsString()
  readonly type!: 'string' | 'number' | 'boolean' | 'date' | 'url' | 'email';

  @ApiProperty({ example: true })
  @IsBoolean()
  readonly required!: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  readonly defaultValue?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  readonly description?: string;
}

export class CreateTemplateHttpDTO {
  @ApiProperty({ example: 'Order Confirmation' })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  readonly name!: string;

  @ApiProperty({ example: 'order-confirmation' })
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  readonly slug!: string;

  @ApiProperty({ enum: TYPE_VALUES })
  @IsEnum(TYPE_VALUES)
  readonly type!: string;

  @ApiProperty({ enum: CATEGORY_VALUES })
  @IsEnum(CATEGORY_VALUES)
  readonly category!: string;

  @ApiProperty({ example: 'en' })
  @IsString()
  @MinLength(2)
  @MaxLength(10)
  readonly locale!: string;

  @ApiPropertyOptional({ example: 'Your order is confirmed' })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  readonly subject?: string;

  @ApiProperty({ example: 'Hello {{name}}, your order #{{orderNumber}} is confirmed.' })
  @IsString()
  @MinLength(1)
  @MaxLength(500_000)
  readonly body!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(500_000)
  readonly bodyHtml?: string;

  @ApiPropertyOptional({ type: [TemplateVariableHttpDTO] })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(50)
  @ValidateNested({ each: true })
  @Type(() => TemplateVariableHttpDTO)
  readonly variables?: readonly TemplateVariableHttpDTO[];
}

export class UpdateTemplateHttpDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(100)
  readonly name?: string;

  @ApiPropertyOptional({ enum: CATEGORY_VALUES })
  @IsOptional()
  @IsEnum(CATEGORY_VALUES)
  readonly category?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(200)
  readonly subject?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(500_000)
  readonly body?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(500_000)
  readonly bodyHtml?: string;

  @ApiPropertyOptional({ type: [TemplateVariableHttpDTO] })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(50)
  @ValidateNested({ each: true })
  @Type(() => TemplateVariableHttpDTO)
  readonly variables?: readonly TemplateVariableHttpDTO[];
}

export class RenderTemplateHttpDTO {
  @ApiProperty()
  readonly data!: Readonly<Record<string, unknown>>;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(10)
  readonly locale?: string;
}

export class PreviewTemplateHttpDTO {
  @ApiPropertyOptional()
  @IsOptional()
  readonly sampleData?: Readonly<Record<string, unknown>>;
}

export class ListTemplatesHttpQueryDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(1)
  readonly page?: number;

  @ApiPropertyOptional({ maximum: 100 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  readonly limit?: number;

  @ApiPropertyOptional({ enum: TYPE_VALUES })
  @IsOptional()
  @IsEnum(TYPE_VALUES)
  readonly type?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly status?: string;

  @ApiPropertyOptional({ enum: CATEGORY_VALUES })
  @IsOptional()
  @IsEnum(CATEGORY_VALUES)
  readonly category?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly locale?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly search?: string;

  @ApiPropertyOptional({ enum: ['createdAt', 'updatedAt', 'name', 'version'] })
  @IsOptional()
  @IsString()
  readonly sortBy?: string;

  @ApiPropertyOptional({ enum: ['asc', 'desc'] })
  @IsOptional()
  @IsString()
  readonly sortDir?: 'asc' | 'desc';
}

export class GetTemplateBySlugHttpQueryDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(10)
  readonly locale?: string;
}

export class DeactivateTemplateHttpDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  readonly reason?: string;
}

export class DeprecateTemplateHttpDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  readonly replacementTemplateId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  readonly reason?: string;
}
