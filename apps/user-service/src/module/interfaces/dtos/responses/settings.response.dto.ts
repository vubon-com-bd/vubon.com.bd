import { ApiProperty } from '@nestjs/swagger';

export class SettingsResponseDto {
  @ApiProperty()
  userId!: string;

  @ApiProperty({
    type: 'array',
    items: {
      type: 'object',
      properties: {
        key: { type: 'string' },
        value: { type: 'string' },
      },
    },
  })
  entries!: ReadonlyArray<{ key: string; value: string }>;

  @ApiProperty()
  updatedAt!: string;
}
