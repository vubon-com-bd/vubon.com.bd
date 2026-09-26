/**
 * TemplateResponseDTO
 * @module support-service/interfaces/dtos/responses
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class TemplateVariableResponseDTO {
  @ApiProperty() name!: string;
  @ApiProperty() type!: string;
  @ApiProperty() required!: boolean;
  @ApiPropertyOptional() defaultValue?: string;
  @ApiPropertyOptional() description?: string;
}

export class TemplateResponseDTO {
  @ApiProperty() id!: string;
  @ApiProperty() name!: string;
  @ApiProperty() slug!: string;
  @ApiProperty() type!: string;
  @ApiProperty() status!: string;
  @ApiProperty() locale!: string;
  @ApiPropertyOptional() subject?: string;
  @ApiProperty() body!: string;
  @ApiProperty({ type: [TemplateVariableResponseDTO] })
  variables!: TemplateVariableResponseDTO[];
  @ApiProperty() version!: number;
  @ApiProperty() createdBy!: string;
  @ApiPropertyOptional() updatedBy?: string;
  @ApiProperty() createdAt!: string;
  @ApiProperty() updatedAt!: string;
}
