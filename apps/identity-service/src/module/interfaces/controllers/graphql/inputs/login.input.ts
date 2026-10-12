/**
 * Login GraphQL Input
 * @module identity-service/interfaces/controllers/graphql/inputs
 */
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LoginGqlInput {
  @Field() readonly identifier!: string;
  @Field() readonly password!: string;
  @Field({ nullable: true, defaultValue: false }) readonly rememberMe?: boolean;
  @Field({ nullable: true }) readonly deviceId?: string;
  @Field({ nullable: true }) readonly mfaCode?: string;
}
