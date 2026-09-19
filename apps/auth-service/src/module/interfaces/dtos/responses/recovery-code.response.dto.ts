import { ApiProperty } from '@nestjs/swagger';
import type { RecoveryCodesResponseDTO } from '../../../application/dtos/responses/recovery-codes-response.dto';

export class RecoveryCodeResponseDTO implements RecoveryCodesResponseDTO {
  @ApiProperty({
    type: 'array',
    items: {
      type: 'object',
      properties: {
        code: { type: 'string' },
        createdAt: { type: 'string' },
        userId: { type: 'string' },
        used: { type: 'boolean' },
        usedAt: { type: 'string', nullable: true },
      },
    },
  })
  codes!: RecoveryCodesResponseDTO['codes'];

  @ApiProperty()
  generatedAt!: string;
}
