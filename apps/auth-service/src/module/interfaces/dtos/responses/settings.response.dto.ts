import { ApiProperty } from '@nestjs/swagger';
import type { UserSettingsResponseDTO } from '../../../application/dtos/responses/user-settings-response.dto';

export class SettingsResponseDTO implements UserSettingsResponseDTO {
  @ApiProperty()
  success!: true;

  @ApiProperty({
    type: 'object',
    properties: {
      userId: { type: 'string' },
      locale: { type: 'string' },
      language: { type: 'string' },
      timezone: { type: 'string' },
      currency: { type: 'string' },
      theme: { type: 'string' },
      dateFormat: { type: 'string' },
      timeFormat: { type: 'string' },
      itemsPerPage: { type: 'number' },
      notifications: { type: 'boolean' },
      twoFactor: { type: 'boolean' },
      updatedAt: { type: 'string' },
    },
  })
  settings!: UserSettingsResponseDTO['settings'];
}
