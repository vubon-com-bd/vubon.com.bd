/**
 * CreateTemplateRequestDTO
 * @module support-service/interfaces/dtos/requests/template
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class TemplateVariableInputDTO {
  @ApiProperty() @IsString() name!: string;
  @ApiProperty() @IsString() type!: string;
  @ApiProperty() @IsBoolean() required!: boolean;
  @ApiPropertyOptional() @IsOptional() @IsString() defaultValue?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() description?: string;
}

export class CreateTemplateRequestDTO {
  @ApiProperty()
  @IsString()
  @MinLength(3)
  @MaxLength(150)
  name!: string;

  @ApiProperty()
  @IsString()
  @MinLength(3)
  @MaxLength(150)
  slug!: string;

  @ApiProperty({ example: 'email' })
  @IsString()
  type!: string;

  @ApiPropertyOptional({ example: 'en' })
  @IsOptional()
  @IsString()
  locale?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(200)
  subject?: string;

  @ApiProperty()
  @IsString()
  @MinLength(1)
  body!: string;

  @ApiPropertyOptional({ type: [TemplateVariableInputDTO] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TemplateVariableInputDTO)
  variables?: TemplateVariableInputDTO[];
}
