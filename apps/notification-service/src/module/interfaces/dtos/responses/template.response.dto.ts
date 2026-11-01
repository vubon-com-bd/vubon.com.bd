/**
 * Template HTTP Response DTOs
 * @module notification-service/interfaces/dtos/responses
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class TemplateVariableHttpResponseDTO {
  @ApiProperty() readonly name!: string;
  @ApiProperty() readonly type!: string;
  @ApiProperty() readonly required!: boolean;
  @ApiPropertyOptional() readonly defaultValue?: string;
  @ApiPropertyOptional() readonly description?: string;
}

export class TemplateHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly name!: string;
  @ApiProperty() readonly slug!: string;
  @ApiProperty() readonly type!: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly category!: string;
  @ApiProperty() readonly locale!: string;
  @ApiPropertyOptional() readonly subject?: string;
  @ApiProperty() readonly body!: string;
  @ApiPropertyOptional() readonly bodyHtml?: string;
  @ApiProperty({ type: [TemplateVariableHttpResponseDTO] })
  readonly variables!: readonly TemplateVariableHttpResponseDTO[];
  @ApiProperty() readonly version!: number;
  @ApiPropertyOptional() readonly parentId?: string;
  @ApiProperty() readonly createdAt!: string;
  @ApiProperty() readonly updatedAt!: string;
}

export class TemplateSummaryHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly name!: string;
  @ApiProperty() readonly slug!: string;
  @ApiProperty() readonly type!: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly locale!: string;
  @ApiProperty() readonly version!: number;
  @ApiProperty() readonly createdAt!: string;
}

export class TemplateListHttpResponseDTO {
  @ApiProperty({ type: [TemplateSummaryHttpResponseDTO] })
  readonly items!: readonly TemplateSummaryHttpResponseDTO[];
  @ApiProperty() readonly total!: number;
  @ApiProperty() readonly page!: number;
  @ApiProperty() readonly limit!: number;
  @ApiProperty() readonly totalPages!: number;
}

export class TemplateRenderHttpResponseDTO {
  @ApiProperty() readonly templateId!: string;
  @ApiPropertyOptional() readonly subject?: string;
  @ApiProperty() readonly body!: string;
  @ApiPropertyOptional() readonly bodyHtml?: string;
  @ApiProperty({ isArray: true })
  readonly missingVariables!: readonly string[];
  @ApiProperty() readonly renderedAt!: string;
  @ApiProperty() readonly locale!: string;
}
