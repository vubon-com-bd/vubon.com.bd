import { ApiProperty } from '@nestjs/swagger';
import type { UserAddressResponseDTO } from '../../../application/dtos/responses/user-address-response.dto';

export class AddressResponseDTO implements UserAddressResponseDTO {
  @ApiProperty()
  success!: true;

  @ApiProperty({
    type: 'object',
    properties: {
      id: { type: 'string' },
      userId: { type: 'string' },
      type: { type: 'string' },
      label: { type: 'string', nullable: true },
      line1: { type: 'string' },
      line2: { type: 'string', nullable: true },
      city: { type: 'string' },
      state: { type: 'string', nullable: true },
      country: { type: 'string' },
      postalCode: { type: 'string', nullable: true },
      isDefault: { type: 'boolean' },
      isDefaultShipping: { type: 'boolean' },
      isDefaultBilling: { type: 'boolean' },
      createdAt: { type: 'string' },
      updatedAt: { type: 'string' },
    },
  })
  address!: UserAddressResponseDTO['address'];
}
