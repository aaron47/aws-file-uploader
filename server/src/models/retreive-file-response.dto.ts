import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RetreiveFileResponseDto {
  @Field()
  base64: string;
  @Field()
  contentType: string;
  @Field()
  fileName: string;
}
