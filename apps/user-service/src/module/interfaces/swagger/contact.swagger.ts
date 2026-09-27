/**
 * Contact Swagger helpers
 */
import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  ContactResponseDto,
  ContactListResponseDto,
} from '../dtos/responses/contact.response.dto.js';

export function ApiListContacts() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ summary: 'List contacts for current user' }),
    ApiResponse({ status: 200, type: ContactListResponseDto })
  );
}

export function ApiAddContact() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ summary: 'Add new contact' }),
    ApiResponse({ status: 201, type: ContactResponseDto })
  );
}

export function ApiUpdateContact() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ summary: 'Update contact' }),
    ApiResponse({ status: 200, type: ContactResponseDto })
  );
}

export function ApiDeleteContact() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ summary: 'Delete contact' }),
    ApiResponse({ status: 204 })
  );
}

export function ApiVerifyContact() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ summary: 'Verify contact via code' }),
    ApiResponse({ status: 200, type: ContactResponseDto })
  );
}
