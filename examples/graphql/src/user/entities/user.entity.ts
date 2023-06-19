import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => String)
  id: string;

  @Field(() => String, { nullable: true })
  name: string | null;

  @Field(() => String)
  email: string;
}
