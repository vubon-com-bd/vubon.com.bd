/**
 * AddAddressHandler
 * @module user-service/application/commands/address
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { AddAddressCommand } from './add-address.command.js';
import { USER_ADDRESS_REPOSITORY } from '@domain/repositories/user-address.repository.interface';
import type { UserAddressRepository } from '@domain/repositories/user-address.repository.interface';
import { USER_REPOSITORY } from '@domain/repositories/user.repository.interface';
import type { UserRepository } from '@domain/repositories/user.repository.interface';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { AddressIdVO } from '@domain/value-objects/primitives/address-id.vo';
import { AddressLabelVO } from '@domain/value-objects/primitives/address-label.vo';
import { AddressLineVO } from '@domain/value-objects/primitives/address-line.vo';
import { CityVO } from '@domain/value-objects/primitives/city.vo';
import { DistrictVO } from '@domain/value-objects/primitives/district.vo';
import { DivisionVO } from '@domain/value-objects/primitives/division.vo';
import { PostalCodeVO } from '@domain/value-objects/primitives/postal-code.vo';
import { UserAddressEntity } from '@domain/entities/user-address.entity';
import { CanAddAddressSpecification } from '@domain/specifications/can-add-address.specification';
import { UserAddressMapper } from '../../mappers/user-address.mapper.js';
import type { AddressResponseDTO } from '../../dtos/responses/address-response.dto.js';
import {
  AddressCreationFailedError,
  AddressLimitExceededError,
} from '../../errors/address.errors.js';
import { UserNotFoundApplicationError } from '../../errors/user.errors.js';

@CommandHandler(AddAddressCommand)
export class AddAddressHandler
  implements ICommandHandler<AddAddressCommand, AddressResponseDTO>
{
  constructor(
    @Inject(USER_ADDRESS_REPOSITORY)
    private readonly addressRepo: UserAddressRepository,
    @Inject(USER_REPOSITORY)
    private readonly userRepo: UserRepository
  ) {}

  async execute(command: AddAddressCommand): Promise<AddressResponseDTO> {
    const payload = command.payload;
    const userIdVO = UserIdVO.create(payload.userId);

    // Load user
    const user = await this.userRepo.findById(userIdVO.value);
    if (!user) throw new UserNotFoundApplicationError(payload.userId);

    // Business rule: max addresses
    const count = await this.addressRepo.countByUserId(userIdVO);
    if (!CanAddAddressSpecification.check(user, count)) {
      throw new AddressLimitExceededError(count, 10);
    }

    try {
      const now = new Date().toISOString();
      const address = UserAddressEntity.create({
        addressId: AddressIdVO.create(crypto.randomUUID()),
        userId: userIdVO,
        label: AddressLabelVO.create(payload.type),
        line: AddressLineVO.create(payload.line1),
        city: CityVO.create(payload.city),
        district: DistrictVO.create(payload.state ?? 'dhaka'),
        division: DivisionVO.create(payload.state ?? 'dhaka'),
        postalCode: PostalCodeVO.create(payload.postalCode ?? '1000'),
        isDefault: payload.isDefault ?? false,
        now,
      });

      // If this is default, clear other defaults first
      if (payload.isDefault) {
        await this.addressRepo.clearDefaultForUser(userIdVO);
        address.makeDefault();
      }

      await this.addressRepo.save(address);
      return UserAddressMapper.toResponse(address);
    } catch (err) {
      const reason = err instanceof Error ? err.message : 'unknown error';
      throw new AddressCreationFailedError(reason);
    }
  }
}
