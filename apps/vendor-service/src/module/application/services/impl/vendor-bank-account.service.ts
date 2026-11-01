/**
 * VendorBankAccountService — bank account management
 * @module vendor-service/application/services/impl
 */
import { Inject, Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import {
  VENDOR_BANK_ACCOUNT_REPOSITORY,
  type VendorBankAccountRepository,
} from '../../../domain/repositories/vendor-bank-account.repository.interface.js';
import { VendorBankAccountEntity } from '../../../domain/entities/vendor-bank-account.entity.js';
import { VendorBankAccountVO } from '../../../domain/value-objects/composites/vendor-bank-account.vo.js';
import { BankAccountIdVO } from '../../../domain/value-objects/primitives/bank-account-id.vo.js';
import { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo.js';
import { BankNameVO } from '../../../domain/value-objects/primitives/bank-name.vo.js';
import { BankAccountNumberVO } from '../../../domain/value-objects/primitives/bank-account-number.vo.js';
import { DomainEventBridgeService } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

import { BankAccountMapper } from '../../mappers/bank-account.mapper.js';
import {
  VendorValidationError,
  VendorNotFoundApplicationError,
} from '../../errors/vendor.errors.js';
import type {
  AddBankAccountRequestDTO,
  UpdateBankAccountRequestDTO,
  DeleteBankAccountRequestDTO,
  SetDefaultAccountRequestDTO,
} from '../../dtos/requests/bank-account/index.js';
import type {
  BankAccountResponseDTO,
  BankAccountSummaryResponseDTO,
  BankAccountListResponseDTO,
} from '../../dtos/responses/bank-account-response.dto.js';
import type { IVendorBankAccountService } from '../interfaces/vendor-bank-account.service.interface.js';

@Injectable()
export class VendorBankAccountService implements IVendorBankAccountService {
  private readonly logger = new Logger(VendorBankAccountService.name);

  constructor(
    @Inject(VENDOR_BANK_ACCOUNT_REPOSITORY)
    private readonly repo: VendorBankAccountRepository,
    private readonly eventBridge: DomainEventBridgeService,
  ) {}

  async add(dto: AddBankAccountRequestDTO, _actorId?: string): Promise<BankAccountResponseDTO> {
    const now = new Date().toISOString();
    const id = randomUUID();

    // ─── Uniqueness check ───
    if (await this.repo.existsByVendorAndAccountNumber(dto.vendorId, dto.accountNumber)) {
      throw new VendorValidationError(
        `Account "${dto.accountNumber}" already exists for this vendor`,
        'accountNumber',
      );
    }

    const vo = VendorBankAccountVO.create({
      id: BankAccountIdVO.create(id),
      vendorId: VendorIdVO.create(dto.vendorId),
      bankName: BankNameVO.create(dto.bankName),
      accountNumber: BankAccountNumberVO.create(dto.accountNumber),
      accountHolderName: dto.accountHolderName,
      branchName: dto.branchName,
      routingNumber: dto.routingNumber,
      swiftCode: dto.swiftCode,
      iban: dto.iban,
      accountType: dto.accountType,
      currency: dto.currency,
      isDefault: false,
      isVerified: false,
      createdAt: now,
      updatedAt: now,
    });

    const entity = VendorBankAccountEntity.create({ id, vo, now });
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved as never);
    this.logger.log(`Bank account ${saved.id} added to vendor ${dto.vendorId}`);
    return BankAccountMapper.toResponse(saved as never);
  }

  async update(dto: UpdateBankAccountRequestDTO, _actorId?: string): Promise<BankAccountResponseDTO> {
    const entity = await this.load(dto.bankAccountId);
    // Immutable business fields (accountNumber, currency) — cannot change here
    // For now, no-op update; specific setters can be added later
    void dto;
    const saved = await this.repo.save(entity);
    return BankAccountMapper.toResponse(saved as never);
  }

  async remove(dto: DeleteBankAccountRequestDTO): Promise<{ readonly success: true }> {
    await this.repo.delete(dto.bankAccountId);
    this.logger.log(`Bank account ${dto.bankAccountId} removed`);
    return { success: true };
  }

  async setDefault(dto: SetDefaultAccountRequestDTO, _actorId?: string): Promise<BankAccountResponseDTO> {
    const entity = await this.load(dto.bankAccountId);
    if (!entity.isVerified) {
      throw new VendorValidationError('Cannot set unverified bank account as default', 'bankAccountId');
    }
    entity.markDefault();
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved as never);
    return BankAccountMapper.toResponse(saved as never);
  }

  async verify(bankAccountId: string, _actorId: string): Promise<BankAccountResponseDTO> {
    const entity = await this.load(bankAccountId);
    entity.verify();
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved as never);
    return BankAccountMapper.toResponse(saved as never);
  }

  async unverify(bankAccountId: string, _actorId: string): Promise<BankAccountResponseDTO> {
    const entity = await this.load(bankAccountId);
    entity.unverify();
    const saved = await this.repo.save(entity);
    return BankAccountMapper.toResponse(saved as never);
  }

  async getById(id: string): Promise<BankAccountResponseDTO> {
    const entity = await this.load(id);
    return BankAccountMapper.toResponse(entity);
  }

  async getDefault(vendorId: string): Promise<BankAccountResponseDTO | null> {
    const entity = await this.repo.findDefaultByVendor(VendorIdVO.create(vendorId));
    return entity ? BankAccountMapper.toResponse(entity as never) : null;
  }

  async listByVendor(vendorId: string): Promise<BankAccountListResponseDTO> {
    const entities = await this.repo.findByVendor(VendorIdVO.create(vendorId));
    return BankAccountMapper.toListResponse(entities as never);
  }

  async listVerified(vendorId: string): Promise<readonly BankAccountSummaryResponseDTO[]> {
    const entities = await this.repo.findVerifiedByVendor(VendorIdVO.create(vendorId));
    return entities.map((e) => BankAccountMapper.toSummary(e as never));
  }

  private async load(id: string): Promise<VendorBankAccountEntity> {
    const vo = BankAccountIdVO.create(id);
    const entity = await this.repo.findByIdVO(vo);
    if (!entity) throw new VendorNotFoundApplicationError(id);
    return entity;
  }
}
