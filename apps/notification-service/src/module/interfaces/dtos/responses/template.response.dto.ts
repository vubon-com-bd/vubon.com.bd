/**
 * Template HTTP Response DTOs
 * @module notification-service/interfaces/dtos/responses
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class TemplateVariableHttpResponseDTO {
  @ApiProperty() name!: string;
  @ApiProperty() type!: string;
  @ApiProperty() required!: boolean;
  @ApiPropertyOptional() defaultValue?: string;
  @ApiPropertyOptional() description?: string;
}

export class TemplateHttpResponseDTO {
  @ApiProperty() id!: string;
  @ApiProperty() name!: string;
  @ApiProperty() slug!: string;
  @ApiProperty() type!: string;
  @ApiProperty() status!: string;
  @ApiProperty() category!: string;
  @ApiProperty() locale!: string;
  @ApiPropertyOptional() subject?: string;
  @ApiProperty() body!: string;
  @ApiPropertyOptional() bodyHtml?: string;
  @ApiProperty({ type: [TemplateVariableHttpResponseDTO] })
  variables!: readonly TemplateVariableHttpResponseDTO[];
  @ApiProperty() version!: number;
  @ApiProperty() createdBy!: string;
  @ApiProperty() createdAt!: string;
  @ApiProperty() updatedAt!: string;
}

export class TemplateRenderHttpResponseDTO {
  @ApiPropertyOptional() subject?: string;
  @ApiProperty() body!: string;
  @ApiPropertyOptional() bodyHtml?: string;
  @ApiProperty({ isArray: true, type: String })
  missingVariables!: readonly string[];
  @ApiProperty({ isArray: true, type: String })
  resolvedVariables!: readonly string[];
}
