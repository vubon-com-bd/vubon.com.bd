import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AddContactRequestDto {
  @ApiProperty({ enum: ['email', 'phone', 'whatsapp', 'telegram'] })
  type!: string;

  @ApiProperty()
  value!: string;
}

export class UpdateContactRequestDto {
  @ApiPropertyOptional()
  value?: string;
}

export class DeleteContactRequestDto {
  @ApiProperty()
  contactId!: string;
}

export class VerifyContactRequestDto {
  @ApiProperty()
  code!: string;
}
