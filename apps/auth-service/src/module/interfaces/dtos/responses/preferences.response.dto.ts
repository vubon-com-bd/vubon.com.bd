import { ApiProperty } from '@nestjs/swagger';
import type { UserPreferencesResponseDTO } from '../../../application/dtos/responses/user-preferences-response.dto';

export class PreferencesResponseDTO implements UserPreferencesResponseDTO {
  @ApiProperty()
  success!: true;

  @ApiProperty({
    type: 'object',
    properties: {
      userId: { type: 'string' },
      newsletter: { type: 'boolean' },
      promotions: { type: 'boolean' },
      orderUpdates: { type: 'boolean' },
      productRecommendations: { type: 'boolean' },
      securityAlerts: { type: 'boolean' },
      channels: { type: 'array', items: { type: 'object' } },
      updatedAt: { type: 'string' },
    },
  })
  preferences!: UserPreferencesResponseDTO['preferences'];
}
