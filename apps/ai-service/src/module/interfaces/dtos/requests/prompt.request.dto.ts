import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ExecutePromptRequestDTO {
  @ApiPropertyOptional()
  promptId?: string;

  @ApiPropertyOptional()
  text?: string;

  @ApiPropertyOptional()
  templateId?: string;

  @ApiPropertyOptional({ example: 'user' })
  role?: string;

  @ApiPropertyOptional()
  variables?: Record<string, string | number | boolean>;

  @ApiProperty({ example: 'gpt-4o-mini' })
  model!: string;

  @ApiPropertyOptional({ example: 1000 })
  maxTokens?: number;

  @ApiPropertyOptional({ example: 0.7 })
  temperature?: number;
}

export class CreateTemplateRequestDTO {
  @ApiProperty()
  name!: string;

  @ApiProperty()
  template!: string;

  @ApiPropertyOptional({ example: 'user' })
  role?: string;
}

export class GenerateCompletionRequestDTO {
  @ApiProperty()
  promptId!: string;

  @ApiProperty()
  model!: string;

  @ApiPropertyOptional({ example: 1000 })
  maxTokens?: number;

  @ApiPropertyOptional({ example: 0.7 })
  temperature?: number;

  @ApiPropertyOptional({ type: [String] })
  stopSequences?: readonly string[];
}
