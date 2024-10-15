import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GetUserDto {
  @Field(() => String)
  email: string;
}
