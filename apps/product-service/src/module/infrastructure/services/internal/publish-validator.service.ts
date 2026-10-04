/**
 * PublishValidatorService — infra adapter for publish validation.
 * @module product-service/infrastructure/services/internal
 */
import { Injectable } from '@nestjs/common';
import { PublishValidatorService as DomainPublishValidator } from '../../../domain/services/publish-validator.service.js';

export const PUBLISH_VALIDATOR_SERVICE = Symbol('PUBLISH_VALIDATOR_SERVICE');

@Injectable()
export class PublishValidatorService extends DomainPublishValidator {}
