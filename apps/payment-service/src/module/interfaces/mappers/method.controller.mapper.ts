/**
 * MethodControllerMapper — HTTP DTO ↔ Application DTO
 * @module payment-service/interfaces/mappers
 */
import type { AddPaymentMethodHttpDTO } from '@interfaces/dtos/requests/method.request.dto';
import type { AddPaymentMethodRequestDTO } from '@application/dtos/requests/method/index';
import type {
  MethodResponseDTO,
  MethodSummaryResponseDTO,
  MethodListResponseDTO,
} from '@application/dtos/responses/method-response.dto';
import {
  MethodHttpResponseDTO,
  MethodSummaryHttpResponseDTO,
  MethodListHttpResponseDTO,
} from '@interfaces/dtos/responses/method.response.dto';

export class MethodControllerMapper {
  static toAddAppDto(dto: AddPaymentMethodHttpDTO): AddPaymentMethodRequestDTO {
    return {
      method: dto.method as never,
      type: dto.type as never,
      gateway: dto.gateway as never,
      cardToken: dto.cardToken,
      last4: dto.last4,
      brand: dto.brand,
      expiryMonth: dto.expiryMonth,
      expiryYear: dto.expiryYear,
      holderName: dto.holderName,
      walletAddress: dto.walletAddress,
      walletNetwork: dto.walletNetwork,
      isDefault: dto.isDefault,
    };
  }

  static toHttpResponse(app: MethodResponseDTO): MethodHttpResponseDTO {
    return {
      id: app.id,
      method: app.method,
      type: app.type,
      gateway: app.gateway,
      label: app.label,
      last4: app.last4,
      brand: app.brand,
      expiryMonth: app.expiryMonth,
      expiryYear: app.expiryYear,
      holderName: app.holderName,
      walletAddress: app.walletAddress,
      isActive: app.isActive,
      isDefault: app.isDefault,
      createdAt: app.createdAt,
      updatedAt: app.updatedAt,
    };
  }

  static toSummaryHttp(app: MethodSummaryResponseDTO): MethodSummaryHttpResponseDTO {
    return {
      id: app.id,
      method: app.method,
      type: app.type,
      label: app.label,
      isActive: app.isActive,
      isDefault: app.isDefault,
    };
  }

  static toListHttp(app: MethodListResponseDTO): MethodListHttpResponseDTO {
    return {
      items: app.items.map((i) => this.toSummaryHttp(i)),
      total: app.total,
      page: app.page,
      limit: app.limit,
      totalPages: app.totalPages,
    };
  }
}
