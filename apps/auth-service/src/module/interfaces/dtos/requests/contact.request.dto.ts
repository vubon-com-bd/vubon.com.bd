import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ContactCreateRequestDTO {
  @ApiProperty()
  phone!: string;

  @ApiProperty()
  email!: string;
}

export class ContactUpdateRequestDTO {
  @ApiPropertyOptional()
  phone?: string;

  @ApiPropertyOptional()
  email?: string;
}

export class ContactDeleteRequestDTO {
  @ApiProperty()
  contactId!: string;
}
