import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class SupportUserType {
  @Field(() => ID)
  id!: string;

  @Field()
  email!: string;

  @Field()
  name!: string;

  @Field()
  status!: string;
}
