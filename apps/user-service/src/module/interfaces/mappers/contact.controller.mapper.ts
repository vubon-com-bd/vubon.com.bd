import { Injectable } from '@nestjs/common';
import type { ContactResponseDTO } from '../../application/dtos/responses/contact-response.dto';
import type { ContactResponseDto } from '../dtos/responses/contact.response.dto';

@Injectable()
export class ContactControllerMapper {
  toResponse(appDto: ContactResponseDTO): ContactResponseDto {
    return {
      id: appDto.id,
      userId: '',
      type: appDto.type,
      value: appDto.value,
      verified: appDto.isVerified,
      label: appDto.label,
      createdAt: appDto.createdAt,
      updatedAt: appDto.updatedAt,
    };
  }
}
