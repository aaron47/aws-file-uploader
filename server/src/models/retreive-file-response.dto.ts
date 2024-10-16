import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RetreiveFileResponseDto {
  @Field(() => String)
  base64: string;

  @Field(() => String)
  contentType: string;

  @Field(() => String)
  fileName: string;
}
