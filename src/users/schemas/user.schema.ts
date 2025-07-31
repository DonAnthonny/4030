// src/users/schemas/user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;
@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  phone: string;

  @Prop()
  firstName?: string;

  @Prop()
  lastName?: string;

  @Prop({ unique: true, sparse: true }) // sparse برای جلوگیری از ارور تکراری بودن null
  nationalCode?: string;

  @Prop()
  birthday?: string;

  @Prop()
  referralCode?: string;

  @Prop({ required: true, enum: ['driver', 'passenger'] })
  role: 'driver' | 'passenger';

  @Prop({ enum: ['car', 'vanet', 'motor'], required: false })
  type?: 'car' | 'vanet' | 'motor';

  id: any;
}

export const UserSchema = SchemaFactory.createForClass(User);

