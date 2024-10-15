import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooSchema } from 'mongoose';

@ObjectType()
@Schema({ versionKey: false, collection: 'users' })
export class UserDocument extends Document {
  @Field(() => String)
  _id: MongooSchema.Types.ObjectId;

  @Field()
  @Prop({ unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Field(() => [String], { nullable: true })
  @Prop({ type: [String], default: [] })
  files?: string[];
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);
