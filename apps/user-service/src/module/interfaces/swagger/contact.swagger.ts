import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ContactResponseDto } from '../dtos/responses/contact.response.dto';

export const ContactSwagger = {
  Tag: () => ApiTags('Contacts'),

  List: () =>
    applyDecorators(
      ApiOperation({ summary: 'List user contacts' }),
      ApiResponse({ status: 200, type: [ContactResponseDto] }),
    ),

  Create: () =>
    applyDecorators(
      ApiOperation({ summary: 'Add contact' }),
      ApiResponse({ status: 201, type: ContactResponseDto }),
    ),
};
