// src/users/schemas/user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  phone: string;

 
    @Prop({ required: true })

  firstName?: string;
    @Prop({ required: true })

  lastName?: string;

  @Prop()
  email?: string;

  @Prop()
  referralCode?: string;

  @Prop({ default: 'passenger' })
  role: string;
    id: any;
}

export const UserSchema = SchemaFactory.createForClass(User);
