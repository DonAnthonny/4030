import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Driver extends Document {
  @Prop({ required: true }) phone: string;
  @Prop() name: string;
  @Prop() lastname: string;
  @Prop() nationalCode: string;
  @Prop() shenasnameh: string;
  @Prop() birthday: string;
  @Prop() fatherName: string;

  @Prop() city: string;
  @Prop() address: string;
  @Prop() refCode?: string;

  @Prop() licenseFront?: string;
  @Prop() licenseBack?: string;
  @Prop() selfie?: string;
  @Prop() video?: string;

  @Prop({ enum: ['car', 'vanet', 'motor'], required: true }) type: string;
}

// تعریف تایپ Document مربوط به Driver
export type DriverDocument = Driver & Document;

export const DriverSchema = SchemaFactory.createForClass(Driver);
