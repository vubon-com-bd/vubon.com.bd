/**
 * UpdateAddressHandler
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateAddressCommand } from './update-address.command.js';
import { USER_ADDRESS_REPOSITORY } from '@domain/repositories/user-address.repository.interface';
import type { UserAddressRepository } from '@domain/repositories/user-address.repository.interface';
import { AddressLineVO } from '@domain/value-objects/primitives/address-line.vo';
import { CityVO } from '@domain/value-objects/primitives/city.vo';
import { PostalCodeVO } from '@domain/value-objects/primitives/postal-code.vo';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { UserAddressMapper } from '../../mappers/user-address.mapper.js';
import type { AddressResponseDTO } from '../../dtos/responses/address-response.dto.js';
import {
  AddressNotFoundApplicationError,
  AddressUpdateFailedError,
} from '../../errors/address.errors.js';

@CommandHandler(UpdateAddressCommand)
export class UpdateAddressHandler
  implements ICommandHandler<UpdateAddressCommand, AddressResponseDTO>
{
  constructor(
    @Inject(USER_ADDRESS_REPOSITORY)
    private readonly addressRepo: UserAddressRepository
  ) {}

  async execute(command: UpdateAddressCommand): Promise<AddressResponseDTO> {
    const payload = command.payload;

    const existing = await this.addressRepo.findById(payload.addressId);
    if (!existing) throw new AddressNotFoundApplicationError(payload.addressId);

    try {
      const fields: Parameters<typeof existing.update>[0] = {};
      if (payload.line1) Object.assign(fields, { line: AddressLineVO.create(payload.line1) });
      if (payload.city) Object.assign(fields, { city: CityVO.create(payload.city) });
      if (payload.postalCode) Object.assign(fields, { postalCode: PostalCodeVO.create(payload.postalCode) });

      existing.update(fields);

      if (payload.isDefault === true) {
        await this.addressRepo.clearDefaultForUser(UserIdVO.create(payload.userId));
        existing.makeDefault();
      }

      await this.addressRepo.save(existing);
      return UserAddressMapper.toResponse(existing);
    } catch (err) {
      const reason = err instanceof Error ? err.message : 'unknown error';
      throw new AddressUpdateFailedError(payload.addressId, reason);
    }
  }
}
